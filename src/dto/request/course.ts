export type CreateCourseReq = {
    metadata: {
        name: string
        description: string
        multiLogin: boolean
        value: number
    }
    thumnail: File
}