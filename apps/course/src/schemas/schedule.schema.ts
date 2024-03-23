
import { Prop } from "@nestjs/mongoose";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from '@nestjs/swagger';
import { Geography } from "./Geography.schema";
export class Schedule {
    @AutoMap()
    @Prop()
    weekdays: string[];

    @AutoMap()
    @ApiProperty({ type: [Date] })
    dates: Date[];

    @AutoMap()
    @Prop({ type: [Number] })
    startTimes?: number[];

    @AutoMap()
    @Prop({ type: [Number] })
    endTimes: number[];

    @AutoMap()
    @Prop()
    formatSubtype: string;

    @AutoMap()
    @Prop()
    isDateRange: boolean;

    @AutoMap()
    @ApiProperty({ type: [Date] })
    dateRange: Date[];

    @AutoMap(() => Geography)
    @Prop()
    geography: Geography;
}