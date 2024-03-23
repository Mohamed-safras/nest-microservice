import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type LanguageDocument = Language & Document;

@Schema({ collection: 'language', versionKey: false  })
export class Language {

    @AutoMap()
    @Prop({ required: true })
    name?: string;

    @AutoMap()
    @Prop({ required: true })
    id?: number;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);