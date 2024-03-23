import { Prop } from "@nestjs/mongoose";
import { Schedule } from "./schedule.schema";
import { AutoMap } from '@automapper/classes';
// import { ApprovalAction } from '@app/common';

export class Session {

    @AutoMap()
    @Prop()
    code: number;

    @AutoMap(() => [Schedule])
    @Prop()
    schedules?: Schedule[];

    @AutoMap()
    @Prop()
    registrationStatus?: string;

    @AutoMap(() => String)
    @Prop()
    language?: string;

    @AutoMap(() => [String])
    @Prop()
    format?: string;

    @AutoMap(() => [String])
    @Prop()
    registrationInstructions: string[];

    @AutoMap()
    @Prop()
    description?: string;

    @AutoMap()
    @Prop()
    seatCapacity?: number;

    // @AutoMap()
    // @Prop()
    // sessionApprovalStatus?: ApprovalStatus;

    // @AutoMap()
    // @Prop()
    // sessionApprovalAction?: ApprovalAction;

    @AutoMap()
    @Prop()
    sessionRejectionMessage?: string;

    @AutoMap()
    @Prop()
    createdAt?: Date;

    @AutoMap()
    @Prop()
    updatedAt?: Date;

    @AutoMap()
    @Prop({ type: Object })
    updateChanges?: object
}

