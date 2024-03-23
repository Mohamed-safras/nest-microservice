import { Prop } from "@nestjs/mongoose";
import { AutoMap } from "@automapper/classes";

export class Geography {
    @AutoMap()
    @Prop()
    county: string;

    @AutoMap()
    @Prop()
    city: string;

    @AutoMap()
    @Prop()
    zip: string
}