import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type CourseCategoryDocument = CourseCategory & Document;

@Schema({ collection: 'courseCategory' })
export class CourseCategory {

    @AutoMap()
    @Prop({ required: true })
    category?: string;
}

export const CourseCategorySchema = SchemaFactory.createForClass(CourseCategory);
