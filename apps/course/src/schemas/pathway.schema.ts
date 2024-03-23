import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type PathwayDocument = Pathway & Document;

@Schema({ collection: 'pathway' })
export class Pathway {

    @AutoMap()
    @Prop({ required: true })
    pathway?: string;

}

export const PathwaySchema = SchemaFactory.createForClass(Pathway);