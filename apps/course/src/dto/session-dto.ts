import { AutoMap } from "@automapper/classes";
import { GeographyDTO } from "./geography-dto";
import { ScheduleDto } from "./schedule-dto";
import { ApprovalStatus } from "@app/common";

export class SessionDto {

    @AutoMap()
    code: number;

    @AutoMap(() => GeographyDTO)
    geography: GeographyDTO;

    @AutoMap(() => [ScheduleDto])
    schedules?: ScheduleDto[];

    @AutoMap()
    registrationStatus: string;

    @AutoMap(() => [String])
    languages: string[];

    @AutoMap(() => [String])
    formats: string[];

    @AutoMap(() => [String])
    registrationInstructions: string[];

    @AutoMap()
    seatCapacity?: number;

    @AutoMap()
    aprrovalStatus?: ApprovalStatus;
}