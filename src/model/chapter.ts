import { BaseModel } from "./base";
import { CourseModel } from "./course";
import { LessionModel } from "./lession";

export type ChapterModel = BaseModel & {
    name: string
    description: string
    order: number
    courseId: number

    course?: CourseModel
    lessions: LessionModel[]
}