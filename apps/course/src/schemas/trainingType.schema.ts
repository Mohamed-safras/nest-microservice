import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type TrainingTypeDocument = TrainingType & Document;

@Schema({ collection: 'trainingType' })
export class TrainingType {

    @AutoMap()
    @Prop({ required: true })
    type?: string;
}

export const TrainingTypeSchema = SchemaFactory.createForClass(TrainingType);
