import { BaseModel } from "./base";
import { CourseModel } from "./course";

export type ChapterModel = BaseModel & {
    name: string
    description: string
    order: number
    courseId: number

    course?: CourseModel
    // Lessions []Lession `json:"lessions" gorm:"foreignKey:ChapterId"`
}