import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AutoMap } from "@automapper/classes";

export type CertificationOrLicensureProgramDocument = CertificationOrLicensureProgram & Document;

@Schema({ collection: 'certificationOrLicensureProgram' })
export class CertificationOrLicensureProgram {

    @AutoMap()
    @Prop({ required: true })
    name?: string;
}

export const CertificationOrLicensureProgramSchema = SchemaFactory.createForClass(CertificationOrLicensureProgram);
