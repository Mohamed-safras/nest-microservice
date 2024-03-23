import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CourseRepository extends AbstractRepository<Course> {
  protected readonly logger = new Logger(CourseRepository.name);

  constructor(
    @InjectModel(Course.name) courseModel: Model<Course>,
    @InjectConnection() connection: Connection,
  ) {
    super(courseModel, connection);
  }
}
