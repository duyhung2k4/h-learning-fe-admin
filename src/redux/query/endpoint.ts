import Cookies from "js-cookie";
import { TOKEN_TYPE } from "@/model/variable";



export const HEADER = {
    defaultHeader: () => ({
        accept: 'application/json',
    }),
    refreshTokenHeader: () => {
        const token = Cookies.get(TOKEN_TYPE.REFRESH_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    },
    protectedHeader: () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    },
    protectedMutipartHeader: () => {
        const token = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);
        return {
            accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        }
    },
    codeHeader: () => {
        const token = Cookies.get(TOKEN_TYPE.CODE_TOKEN);
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
}

export const endPoint = {
    auth: {
        loginGoogle: () => ({
            url: "api/v1/auth/login",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        register: () => ({
            url: "api/v1/auth/register",
            method: "POST",
            headers: HEADER.defaultHeader(),
        }),
        acceptCode: () => ({
            url: "api/v1/auth/accept-code",
            method: "POST",
            headers: HEADER.codeHeader(),
        }),
        refreshToken: () => ({
            url: "api/v1/protected/auth/refresh-token",
            method: "POST",
            headers: HEADER.refreshTokenHeader(),
        }),
    },
    query: {
        query: (model: string) => ({
            url: `api/v1/protected/query/${model}`,
            method: "POST",
            headers: HEADER.protectedHeader(),
        }),
    },
    course: {
        getAll: () => ({
            url: `api/v1/protected/course/get-all`,
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        detail: () => ({
            url: `api/v1/protected/course/detail`,
            method: "GET",
            headers: HEADER.protectedHeader(),
        }),
        create: () => ({
            url: `api/v1/protected/course/create`,
            method: "POST",
            headers: HEADER.protectedMutipartHeader(),
        }),
        update: () => ({
            url: `api/v1/protected/course/update`,
            method: "PUT",
            headers: HEADER.protectedMutipartHeader(),
        })
    }
}