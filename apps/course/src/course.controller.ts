import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course-dto';
import { CourseService } from './course.service';
import { JwtAdminAuthGuard } from '@app/common';
import {Response} from "express"
import { UpdateCourseDto } from './dto/update-course.request.dto.';
import { Course } from './schemas/course.schema';
import { CurrentAdmin } from 'apps/auth/src/authentication/decorators/current-admin.decorator';
import { Admin } from 'apps/auth/src/users/schemas/admin.schema';
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAdminAuthGuard)
  async createCourse(@CurrentAdmin() adminUser: Admin, @Body() createCourseDto: CreateCourseDto, @Req() req: any, @Res({ passthrough: true }) response: Response) {
    const newCourse = await this.courseService.createCourse(
      createCourseDto,
      adminUser._id.toString(),
      req.cookies?.Authentication,
    );
    response.status(HttpStatus.CREATED).json({
      message: 'Thank you for your submission. We will review and approve before publishing. We will send you an email confirmation.',
      newCourse,
    });
  }

  @Get()
  @UseGuards(JwtAdminAuthGuard)
  async getCourseById(@CurrentAdmin() adminUser: Admin, @Query('id') id: string): Promise<any> {
    console.log(adminUser._id)
    try {
      const course = await this.courseService.getCourseById(id);
      return course; // Assuming courseService.getCoursById(id) already returns a single course or throws a NotFoundException
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }else if (error instanceof BadRequestException){
        throw new BadRequestException(error.message)
      }
      console.error(error); // Log any other errors for debugging
      throw error;
    }
  }
  
  @Get()
  @UseGuards(JwtAdminAuthGuard)
  async getAllCourses(@CurrentAdmin() adminUser: Admin): Promise<Course[]> {
    console.log(adminUser._id)
    try {
      console.log("getAllCourses");
      return await this.courseService.getAllCourses();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error(error); // Log any other errors for debugging
      throw error;
    }
  }
  

  @Put('update')
  @UseGuards(JwtAdminAuthGuard)
  async updateCourse(@Body() course: UpdateCourseDto, @Req() req: any, @Res({ passthrough: true }) response: Response) {
      const result = await this.courseService.updateCourseById(course,req.cookies?.Authentication);
      response.status(HttpStatus.CREATED).json({
          message: 'Thank you for your submission. We will review and approve before publishing. We will send you an email confirmation',
          result,
      });
  }
}
