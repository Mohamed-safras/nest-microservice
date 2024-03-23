import { AutoMap } from "@automapper/classes";
import { IsBoolean, IsOptional, IsNotEmpty, Matches, ValidateIf } from "class-validator";
import { GeographyDTO } from "./geography-dto";

export class ScheduleDto {

    @AutoMap()
    weekdays: string[];

    @AutoMap(() => Date)
    @IsNotEmpty()
    @ValidateIf(o => o.isDateRange === false)
    dates: Date[];

    @AutoMap()
    @IsOptional()
    @Matches(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, { each: true, message: ' Start Time should be in HH:mm AM/PM format' })
    startTimes: number[]; //TODO: We temporarily add time in decimal format. we are planning to move the time to time zone format in future

    @AutoMap()
    @IsOptional()
    @Matches(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, { each: true, message: ' End Time should be in HH:mm AM/PM format' })
    endTimes: number[]; //TODO: We temporarily add time in decimal format. we are planning to move the time to time zone format in future

    @AutoMap()
    @IsOptional()
    formatSubtype: string;

    @AutoMap()
    @IsOptional()
    @IsBoolean()
    isDateRange: boolean;

    @AutoMap(() => Date)
    @IsOptional()
    dateRange: Date[];

    @AutoMap(() => GeographyDTO)
    geography: GeographyDTO;
}