import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EMAIL_SERVICE } from './constants/services';
import { CourseRepository } from './course.repository';
import {  ApprovalAction, ApprovalStatus, COURSE_CREATED, COURSE_UPDATED, convertTimeToMinutes } from '@app/common';
import { UpdateCourseDto } from './dto/update-course.request.dto.';
import { Types } from 'mongoose';
import { CreateCourseDto } from './dto/create-course-dto';
import { Course } from './schemas/course.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly configService:ConfigService,
    @Inject(EMAIL_SERVICE) private emailClient: ClientProxy,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto, currentUser:string,authentication: string) {
    
    const session = await this.courseRepository.startTransaction();
    try {

      await this.validateCreateCourse(createCourseDto,currentUser)

      const newCourse = await this.courseRepository.create({createdBy:currentUser,...createCourseDto}, { session });
      await lastValueFrom(
        this.emailClient.emit(COURSE_CREATED, {
          newCourse,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();
      return newCourse;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getCourseById(_id: string): Promise<Course> {
    try {
      if (!Types.ObjectId.isValid(_id)) {
        throw new BadRequestException('Invalid ObjectId');
      }
      // find one document from course repository by _id
      const course = await this.courseRepository.findOneById(_id);

      // if the course not found ; throw not found exception
      if (!course) {
        throw new NotFoundException("Course not found with this ID");
      }
      // otherwise return the course
      return course;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Course not found
        throw error;
      }else if(error instanceof BadRequestException){
        throw error;
      } else {
        // Other internal errors
        throw new InternalServerErrorException(`Error fetching course: ${error.message}`);
      }
    }
  }

  async getAllCourses() : Promise<Course[]> {
    try {
      const courses = await this.courseRepository.find({});
      if(!courses || courses.length <= 0){
        throw new NotFoundException('Course not found')
      }
      return courses
    } catch (error) {
      throw new Error(`Error fetching all courses ${error.message}`)
    }
  }

  async updateCourseById(course: UpdateCourseDto,authentication: string): Promise<object> {
    const session = await this.courseRepository.startTransaction();
    try {
      const isIdExist: Course = await this.courseRepository.findOne({_id:course._id});

      if (!isIdExist) {
          throw new NotFoundException('Course not found');
      }

      Object.assign(course, { courseDurationInMinutes: convertTimeToMinutes(course.durationHours) })

      const { _id, ...courseWithoutId } = course;
      const updatedCourse = this.courseRepository.findOneAndUpdate(
        {_id},
        {
            updateChanges: courseWithoutId,
            approvalStatus: ApprovalStatus.PENDING,
            approvalAction: ApprovalAction.EDIT,
            rejectionMessage: "",
            updatedAt: new Date(Date.now())
        });

      const emailPayload = {
          "receiver": isIdExist.trainingPartnerEmail,
          "type": ApprovalStatus.PENDING,
          "action": "EditedCourse",
          "partner": {
              "firstName": isIdExist.trainingPartnerFirstName,
              "lastName": isIdExist.trainingPartnerLastName,
              "name": isIdExist.trainingPartnerName
          },
          "updatedAt": new Date(Date.now())
      }

      const adminEmailPayload = {
          "receiver": this.configService.get("ADMIN_EMAIL"),
          "type": ApprovalStatus.PENDING,
          "action": "EditedCourse",
          "partner": {
              "firstName": isIdExist.trainingPartnerFirstName,
              "lastName": isIdExist.trainingPartnerLastName,
              "name": isIdExist.trainingPartnerName
          },
          "updatedAt": new Date(Date.now())
      }

      await lastValueFrom(
        this.emailClient.emit(COURSE_UPDATED, {
          emailPayload,
          Authentication: authentication,
        })
      );

      await lastValueFrom(
        this.emailClient.emit(COURSE_UPDATED, {
          emailPayload:adminEmailPayload,
          Authentication: authentication,
        })
      );

      await session.commitTransaction();

      return updatedCourse
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
    
}

  async findCourseByNumber(number: string, id: Types.ObjectId): Promise<boolean | null> {
    const result = await this.courseRepository.find({ number });
    if (id != result[0]?._id) {
        if (number == result[0]?.number) {
            return true;
        }
        return false;
    }
    if ((id && result.length > 1) || (!id && result.length > 0)) {
        return true;
    }
    return false;
  }

  private async validateCreateCourse(createCourseDto: CreateCourseDto, currentUser: string) {
    const existingCourse = await this.courseRepository.findOne({
      name: createCourseDto.name,
      createdBy: currentUser,
      number: createCourseDto.number,
    });
    if (!existingCourse) {
      return; // Course does not exist, so return without throwing an exception
    }
    throw new ConflictException('Course with the same name, number, and createdBy already exists');
  }
}
