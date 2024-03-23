import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false })
export class TrainingPartner extends User {
  @Prop({ type: SchemaTypes.ObjectId })
  createdBy: string;
}

export const TrainingPartnerSchema =
  SchemaFactory.createForClass(TrainingPartner);
