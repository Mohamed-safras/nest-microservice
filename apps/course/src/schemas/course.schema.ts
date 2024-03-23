import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Session } from "./session.schema";
import { AutoMap } from "@automapper/classes";
import { AbstractDocument } from '@app/common';

export type CourseDocument = Course & Document<Types.ObjectId>;

@Schema({ collection: 'course' })
export class Course extends AbstractDocument {

  @AutoMap(() => [String])
  @Prop()
  programName?: string[];

  @AutoMap()
  @Prop()
  name?: string;

  @AutoMap()
  @Prop({ required: true, unique: true, })
  number?: string;

  @AutoMap()
  @Prop()
  description?: string;

  @AutoMap()
  @Prop()
  prerequisiteDesc?: string;

  @AutoMap()
  @Prop()
  incentiveTypeName?: string;

  @AutoMap()
  @Prop()
  jobTrack?: string[];

  @AutoMap()
  @Prop()
  certificationOrLicensureProgram?: string[];

  @AutoMap()
  @Prop()
  trainingType?: string[];

  @AutoMap()
  @Prop()
  accommodationsProvided: string;

  @AutoMap()
  @Prop()
  trainingPartnerWebsite: string;

  @AutoMap(() => [String])
  @Prop()
  topics?: string[];

  @AutoMap()
  @Prop()
  durationHours: string;

  @AutoMap()
  @Prop()
  courseDurationInMinutes: number;

  @AutoMap()
  @Prop()
  trainingPartnerName?: string;

  @AutoMap()
  @Prop()
  trainingPartnerId?: number;

  @AutoMap()
  @Prop()
  trainingPartnerEmail?: string;

  @AutoMap()
  @Prop()
  trainingPartnerFirstName?: string;

  @AutoMap()
  @Prop()
  trainingPartnerLastName?: string;

  @AutoMap(() => [Session])
  @Prop()
  sessions?: Session[];

  @AutoMap()
  @Prop()
  registrationStatus?: string;

  @AutoMap()
  @Prop()
  isTranslated?: boolean;

  @AutoMap()
  @Prop({ type: Object })
  updateChanges?: object

  // @Prop({ default: ApprovalStatus.PENDING })
  // approvalStatus?: ApprovalStatus

  // @Prop()
  // approvalAction?: ApprovalAction

  @Prop()
  rejectionMessage?: string

  @AutoMap()
  @Prop()
  sessionAvailability?: boolean;

  @AutoMap()
  @Prop()
  sessionAvailabilityDescription?: string

  @AutoMap(() => [String])
  @Prop()
  languages?: string[];

  @AutoMap(() => [String])
  @Prop()
  formats?: string[];

  @AutoMap()
  @Prop()
  sessionCount?: number;

  @AutoMap()
  @Prop()
  completedAt?: Date;

  @AutoMap()
  @Prop({ required: true, default: new Date(Date.now()) })
  createdAt: Date;

  @AutoMap()
  @Prop()
  updatedAt: Date;

  @AutoMap()
  @Prop()
  deletedAt?: Date;

  @AutoMap()
  @Prop()
  isAvailable?: boolean;

  @AutoMap()
  @Prop()
  sortPriorityId?:number;

  @AutoMap()
  @Prop()
  createdBy?:string
}

export const CourseSchema = SchemaFactory.createForClass(Course);