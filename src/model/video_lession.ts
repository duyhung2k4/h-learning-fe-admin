import { BaseModel } from "./base";
import { LessionModel } from "./lession";

export type VideoLessionModel = BaseModel & {
    code: string
    thumnail: string
    url360p?: string
    url480p?: string
    url720p?: string
    url1080p?: string
    lessionId: number

    lession?: LessionModel
}