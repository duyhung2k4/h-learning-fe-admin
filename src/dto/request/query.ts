import { METHOD } from "@/constants/query"

export type QueryReq = {
    data: any
    condition: string
    args: any[]
    preload: string[]
    omit: Record<string, string[]>
    method: METHOD
    order: string
}