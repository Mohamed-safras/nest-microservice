import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type RegistrationStatusDocument = RegistrationStatus & Document;

@Schema({collection:'registrationStatus'})
export class RegistrationStatus {

    @AutoMap()
    @Prop({required: true})
    registrationStatus?: string;
}

export const RegistrationStatusSchema = SchemaFactory.createForClass(RegistrationStatus);
