import { AutoMap } from "@automapper/classes";

export class GetCourseById {
    @AutoMap()
    courseId: number;

    @AutoMap()
    userId:number
}