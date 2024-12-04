import { BaseModel } from "./base";

export type ProfileModel = BaseModel & {
    firstName: string
    lastName: string
    phone: string
    email: string
    username: string
    password: string
    active: boolean
    roleId: number
    organizationId?: number

    // Role            *Role            `json:"role" gorm:"foreignKey:RoleId; constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
    // Organization    *Organization    `json:"organization" gorm:"foreignKey:OrganizationId; constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
    // CourseRegisters []CourseRegister `json:"courseRegisters" gorm:"foreignKey:ProfileId;"`
}