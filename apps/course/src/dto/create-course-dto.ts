import { AutoMap } from "@automapper/classes";
import { ArrayNotEmpty, IsEmail, IsNotEmpty, Matches, IsString, ArrayMaxSize, ValidateIf, IsOptional } from 'class-validator';
import { SessionDto } from './session-dto';
// import { ApprovalAction, ApprovalStatus } from '@app/common';
// import { CourseNumbervalidation, CharacterLengthValidation, TrainingPartnervalidation } from '../validation/custom-course-validations';
import { Transform } from 'class-transformer';

export class CreateCourseDto {

    @AutoMap(() => String)
    @IsNotEmpty({ message: "Program Name should not be empty." })
    readonly programName: string[];

    @AutoMap()
    @IsNotEmpty({ message: "Course Name should not be empty." })
    readonly name: string;

    @AutoMap()
    @IsNotEmpty({ message: "Course Number should not be empty." })
    @Matches(/^[a-zA-Z0-9]*$/, { message: 'Course number allows only alphanumeric characters.' })
    // @Validate(CourseNumbervalidation)
    readonly number: string;

    @AutoMap()
    @IsNotEmpty({ message: "Course Description should not be empty." })
    // @Validate(CharacterLengthValidation)
    readonly description: string;

    @AutoMap()
    @IsNotEmpty({ message: "Eligibility Requirements should not be empty." })
    readonly prerequisiteDesc: string;

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
    @IsOptional()
    readonly trainingPartnerWebsite: string;

    @AutoMap(() => String)
    @ArrayNotEmpty({ message: "Core Competency should not be empty." })
    @ArrayMaxSize(5, { message: "Core Competency should contain not more than 5 selections." })
    readonly topics: string[];

    @AutoMap()
    @IsString()
    @IsNotEmpty({ message: "Total Course Duration should not be empty." })
    @Matches(/^(0{1,3}\d{0,3}|[1-9]\d{0,3})\:([0-5]\d)$/, { each: true, message: 'Duration Hours should be in HHHH:mm format.' })
    readonly durationHours: string;

    @AutoMap()
    courseDurationInMinutes: number;

    @AutoMap()
    @IsNotEmpty({ message: "Training Partner should not be empty." })
    // @Validate(TrainingPartnervalidation)
    readonly trainingPartnerName: string;

    @AutoMap()
    readonly trainingPartnerId?: number;

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
    @IsNotEmpty({ message: "Course Registration Status should not be empty." })
    readonly registrationStatus: string;

    @AutoMap()
    @ValidateIf(o => o.sessionAvailability === false)
    @IsNotEmpty({ message: "Session Availability Description should not be empty." })
    readonly sessionAvailabilityDescription?: string

    @AutoMap(() => String)
    @ValidateIf(o => o.sessionAvailability === false)
    @ArrayNotEmpty({ message: "Course Languages should not be empty." })
    readonly languages: string[];

    @AutoMap(() => String)
    @ValidateIf(o => o.sessionAvailability === false)
    @ArrayNotEmpty({ message: "Course Formats should not be empty." })
    readonly formats: string[];

    @AutoMap()
    @IsNotEmpty({ message: "Session Availability should not be empty." })
    @Transform(({ value }) => { return ['Yes', 'true', 1, '1'].indexOf(value) > -1; })
    readonly sessionAvailability?: boolean;

    @AutoMap()
    readonly incentiveTypeName: string;

    @AutoMap(() => [SessionDto])
    readonly sessions: SessionDto[];

    @AutoMap()
    readonly courseCategory?: string

    // @AutoMap()
    // readonly approvalStatus?: ApprovalStatus;

    // @AutoMap()
    // readonly approvalAction?: ApprovalAction;

    @AutoMap()
    readonly accommodationsProvided: string;

    readonly completedAt?: Date;

    readonly createdAt: Date;

    readonly deletedAt: Date;

    readonly updatedAt:Date;

    @AutoMap()
    readonly isTranlated?: boolean;

    @AutoMap()
    isAvailable?: boolean;
}