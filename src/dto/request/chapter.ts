export type CreateChapterReq = {
    name: string
    description: string
    courseId: number
}

export type UpdateChapterReq = {
    id: number
    order?: number
    name?: string
    description?: string
}