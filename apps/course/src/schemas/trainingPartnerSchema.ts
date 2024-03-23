import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";
import { AbstractDocument } from '@app/common';

export type TrainingPartnerDocument = TrainingPartner & Document;

@Schema({ collection: 'trainingPartner' })
export class TrainingPartner extends AbstractDocument{


    @AutoMap()
    @Prop({ required: true })
    trainingPartnerName?: string;

    @AutoMap()
    @Prop({ required: true})
    id?: number;
}

export const TrainingPartnerSchema = SchemaFactory.createForClass(TrainingPartner);  
