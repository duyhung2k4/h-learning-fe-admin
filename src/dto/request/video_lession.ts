export type CreateVideoLessionReq = {
    lessionId: number
}

export type UploadVideoMp4Req = {
    metadata: {
        lessionId: number
        uuid: string
    }
    video: File
}

export type CheckVideoUploadReq = {
    videoLessionId: number
}