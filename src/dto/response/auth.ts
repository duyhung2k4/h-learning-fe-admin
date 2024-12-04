import { ProfileModel } from "@/model/profile"


export type AuthResponse = {
    accessToken: string
    refreshToken: string
    profile: ProfileModel
}

export type RegisterResponse = {
    token: string
    exp: Date
}

export type SendFileAuthResponse = {
    data: string
}