import { AutoMap } from "@automapper/classes";
import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsBoolean, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from "class-validator";
import {Types} from "mongoose"
// import { CourseNumbervalidation } from "../validation/custom-course-validations";
export class UpdateCourseDto {
  @IsMongoId()
  @AutoMap()
  @IsNotEmpty({ message: "Id should not be empty" })
  readonly _id: Types.ObjectId;

  @AutoMap(() => String)
  @IsNotEmpty({ message: "Program name should not be empty" })
  readonly programName?: string[];

  @AutoMap()
  @IsNotEmpty({ message: "Name should not be empty" })
  @IsString()
  readonly name?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Description should not be empty" })
//   @Validate(CharacterLengthValidation)
  readonly description?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Eligibility Requirements should not be empty." })
  @IsString()
  readonly prerequisiteDesc?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  readonly incentiveTypeName?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Job Track should not be empty." })
  readonly jobTrack: [string];

  @AutoMap()
  @IsNotEmpty({ message: "Certification/Licensure Program should not be empty." })
  readonly certificationOrLicensureProgram: [string];

  @AutoMap()
  @IsNotEmpty({ message: "Training Type should not be empty." })
  readonly trainingType: [string];

  @AutoMap(() => String)
  @ArrayNotEmpty({ message: "Core Competency should not be empty" })
  readonly topics?: string[];

  @AutoMap(() => String)
  @IsOptional()
  readonly trainingPartnerWebsite: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty({ message: "Total Course Duration should not be empty." })
  @Matches(/^(0{1,3}\d{0,3}|[1-9]\d{0,3})\:([0-5]\d)$/, { each: true, message: 'Duration Hours should be in HHHH:mm format.' })
  readonly durationHours: string;

  @AutoMap()
  courseDurationInMinutes: number;

  @AutoMap()
  @IsNotEmpty({ message: "Training partner name should not be empty" })
  @IsString()
  readonly trainingPartnerName?: string;

  @AutoMap()
  @IsEmail({},{ message: "Please enter a valid email for Training Partner Email." })
  @IsNotEmpty({ message: "Training Partner Email should not be empty." })
  readonly trainingPartnerEmail?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Training Partner First Name should not be empty." })
  readonly trainingPartnerFirstName?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Training Partner Last Name should not be empty." })
  readonly trainingPartnerLastName?: string;

  @AutoMap(() => String)
  @ValidateIf(o => o.sessionAvailability === false)
  @ArrayNotEmpty({ message: "Course Languages should not be empty." })
  readonly languages: string[];

  @AutoMap(() => String)
  @ValidateIf(o => o.sessionAvailability === false)
  @ArrayNotEmpty({ message: "Course Formats should not be empty." })
  readonly formats: string[];

  @AutoMap(() => String)
  @ValidateIf(o => o.sessionAvailability === false)
  @IsNotEmpty({ message: "Course Registration Status should not be empty." })
  readonly registrationStatus: string;

  @AutoMap()
  @IsNotEmpty({ message: "Session Availability should not be empty." })
  @Transform(({ value }) => { return ['Yes', 'true', 1, '1'].indexOf(value) > -1; })
  readonly sessionAvailability?: string;

  @AutoMap()
  readonly accommodationsProvided: string;

  @AutoMap()
  @IsOptional()
  @IsBoolean()
  readonly isTranslated?: boolean;

  @AutoMap()
  @Matches(/^[a-zA-Z0-9]*$/, { message: 'Course number allows only alphanumeric characters.' })
  // @Validate(CourseNumbervalidation)
  @IsOptional()
  @IsString()
  readonly number?: string;

  @AutoMap()
  @ValidateIf(o => o.sessionAvailability === false)
  @IsNotEmpty({ message: "Session Availability Description should not be empty." })
  readonly sessionAvailabilityDescription?: string

  @AutoMap()
  @IsOptional()
  @IsBoolean()
  readonly isAvailable?: boolean;

  @AutoMap()
  @IsOptional()
  @IsString()
  readonly courseCategory?: string;

  readonly completedAt?: Date;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly deletedAt?: Date;
}