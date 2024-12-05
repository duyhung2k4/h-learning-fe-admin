export type CreateCourseReq = {
    metadata: {
        name: string
        description: string
        multiLogin: boolean
        value: number
        introduce: string
    }
    thumnail: File
}

export type UpdateCourseReq = {
    metadata: {
        id: number
        name?: string
        description?: string
        multiLogin?: boolean
        value?: number
        introduce?: string
    },
    thumnail: File
}