import { BaseModel } from "./base";
import { ProfileModel } from "./profile";

export type CourseModel = BaseModel & {
    name: string
    code: string
    description: string
    multiLogin: boolean
    value: number
    active: boolean
    createId: number

    Create?: ProfileModel
    // CourseCategorys []CourseCategory `json:"courseCategorys" gorm:"foreignKey:CourseId;"`
    // Chapters        []Chapter        `json:"chapters" gorm:"foreignKey:CourseId;"`
    // SaleCourses     []SaleCourse     `json:"saleCourses" gorm:"foreignKey:CourseId;"`
}