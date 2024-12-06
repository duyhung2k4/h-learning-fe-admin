export type CreateLessionReq = {
    name: string
    description: string
    courseId: number
    chapterId: number
}

export type UpdateLessionReq = {
    id: number
    name: string
    description: string
}