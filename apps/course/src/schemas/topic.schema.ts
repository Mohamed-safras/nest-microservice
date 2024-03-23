import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type TopicDocument = Topic & Document;

@Schema({collection:'topic'})
export class Topic {

    @AutoMap()
    @Prop({required: true})
    topic?: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
