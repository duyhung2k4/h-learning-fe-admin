export type LoginRequest = {
    username: string
    password: string
}

export type RegisterRequest = {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
}

export type AcceptCodeRequest = {
    code: string
}