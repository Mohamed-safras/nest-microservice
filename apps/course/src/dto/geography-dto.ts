import { AutoMap } from "@automapper/classes";

export class GeographyDTO {
    @AutoMap()
    zip: string;

    @AutoMap()
    county: string;

    @AutoMap()
    city: string;
}