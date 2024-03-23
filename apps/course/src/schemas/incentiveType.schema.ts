import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type IncentiveTypeDocument = IncentiveType & Document;

@Schema({ collection: 'incentiveType' })
export class IncentiveType {

    @AutoMap()
    @Prop({ required: true })
    name?: string;
}

export const IncentiveTypeSchema = SchemaFactory.createForClass(IncentiveType);
