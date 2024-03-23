import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type JobTrackDocument = JobTrack & Document;

@Schema({ collection: 'jobTrack' })
export class JobTrack {

    @AutoMap()
    @Prop({ required: true })
    name?: string;
}

export const JobTrackSchema = SchemaFactory.createForClass(JobTrack);
