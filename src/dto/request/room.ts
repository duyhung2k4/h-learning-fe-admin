export type AddAccountForRoomReq = {
    roomId: number
    password: string
    emailAccept: string
}

export type SaveStepReq = {
    scheduleId: number
    specId: number
    result: string
    roomId: number
}