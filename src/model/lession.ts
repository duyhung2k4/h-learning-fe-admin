import { BaseModel } from "./base";
import { ChapterModel } from "./chapter";
import { CourseModel } from "./course";

export type LessionModel = BaseModel & {
    name: string
    description: string
    order: number
    chapterId: number
    courseId: number

    chapter?: ChapterModel
    course?: CourseModel
    // VideoLession *VideoLession `json:"videoLession" gorm:"foreignKey:LessionId"`
}