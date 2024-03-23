import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type CountyDocument = County & Document;

@Schema({ collection: 'county' })
export class County {

    @AutoMap()
    @Prop()
    name?: string;
}

export const CountySchema = SchemaFactory.createForClass(County);
