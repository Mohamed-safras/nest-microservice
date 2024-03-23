import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule, AuthModule } from '@app/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';
import { Course, CourseSchema } from './schemas/course.schema';
import { EMAIL_SERVICE } from './constants/services';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        ADMIN_EMAIL:Joi.string().required()
      }),
      envFilePath: './apps/course/.env',
    }),
    RmqModule.register({
      name: EMAIL_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
