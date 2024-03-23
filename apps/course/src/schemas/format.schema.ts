import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type FormatDocument = Format & Document;

@Schema({ collection: 'courseFormat' })
export class Format {

    @AutoMap()
    @Prop({ required: true })
    format?: string;
}

export const FormatSchema = SchemaFactory.createForClass(Format);
