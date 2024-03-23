import { AutoMap } from "@automapper/classes";
import { Types } from "mongoose";
import { ApprovalAction, ApprovalStatus } from "@app/common";
import { SessionDto } from "../dto/session-dto";

export class CourseDetailsDto {
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap(() => String)
    programName: string[];

    @AutoMap()
    name: string;

    @AutoMap()
    number: string;

    @AutoMap()
    description: string;

    @AutoMap()
    incentiveTypeName: string;

    @AutoMap()
    trainingPartnerName: string;

    @AutoMap()
    trainingPartnerEmail?: string;

    @AutoMap()
    trainingPartnerFirstName?: string;

    @AutoMap()
    trainingPartnerLastName?: string;

    @AutoMap(() => [SessionDto])
    sessions: SessionDto[];

    @AutoMap(() => String)
    topics: string[];

    @AutoMap()
    courseCategory?: string

    @AutoMap()
    durationHours: string;

    @AutoMap()
    sessionAvailability?: boolean;

    @AutoMap()
    sessionAvailabilityDescription?: string

    @AutoMap()
    isAvailable?: boolean;

    @AutoMap()
    approvalStatus?: ApprovalStatus;

    @AutoMap()
    approvalAction?: ApprovalAction

}