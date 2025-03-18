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
      url: "api/v1/auth/refresh-token",
      method: "POST",
      headers: HEADER.refreshTokenHeader(),
    }),
  },
  query: {
    query: (model: string) => ({
      url: `api/v1/query/${model}`,
      method: "POST",
      headers: HEADER.protectedHeader(),
    }),
  },
  course: {
    getAll: () => ({
      url: `api/v1/course/get-all`,
      method: "GET",
      headers: HEADER.protectedHeader(),
    }),
    detail: () => ({
      url: `api/v1/course/detail`,
      method: "GET",
      headers: HEADER.protectedHeader(),
    }),
    create: () => ({
      url: `api/v1/course/create`,
      method: "POST",
      headers: HEADER.protectedMutipartHeader(),
    }),
    update: () => ({
      url: `api/v1/course/update`,
      method: "PUT",
      headers: HEADER.protectedMutipartHeader(),
    })
  },
  chapter: {
    getByCourseId: () => ({
      url: `api/v1/chapter/get-by-course`,
      method: "GET",
      headers: HEADER.protectedMutipartHeader(),
    }),
    create: () => ({
      url: `api/v1/chapter/create`,
      method: "POST",
      headers: HEADER.protectedMutipartHeader(),
    }),
    update: () => ({
      url: `api/v1/chapter/update`,
      method: "PUT",
      headers: HEADER.protectedMutipartHeader(),
    }),
    delete: () => ({
      url: `api/v1/chapter/delete`,
      method: "DELETE",
      headers: HEADER.protectedMutipartHeader(),
    })
  },
  lession: {
    getDetail: () => ({
      url: `api/v1/lession/detail`,
      method: "GET",
      headers: HEADER.protectedMutipartHeader(),
    }),
    getByCourseId: () => ({
      url: `api/v1/lession/get-by-course`,
      method: "GET",
      headers: HEADER.protectedMutipartHeader(),
    }),
    create: () => ({
      url: `api/v1/lession/create`,
      method: "POST",
      headers: HEADER.protectedMutipartHeader(),
    }),
    update: () => ({
      url: `api/v1/lession/update`,
      method: "PUT",
      headers: HEADER.protectedMutipartHeader(),
    })
  },
  quizz: {
    getById: () => ({
      url: `api/v1/quizz/get-by-id`,
      method: "GET",
      headers: HEADER.protectedMutipartHeader(),
    }),
    getByEntityId: () => ({
      url: `api/v1/quizz/get-by-entity-id`,
      method: "GET",
      headers: HEADER.protectedMutipartHeader(),
    }),
    create: () => ({
      url: `api/v1/quizz/create`,
      method: "POST",
      headers: HEADER.protectedMutipartHeader(),
    }),
    update: () => ({
      url: `api/v1/quizz/update`,
      method: "PUT",
      headers: HEADER.protectedMutipartHeader(),
    }),
    delete: () => ({
      url: `api/v1/quizz/delete`,
      method: "PUT",
      headers: HEADER.protectedMutipartHeader(),
    })
  },
  videoLession: {
    detail: () => ({
      url: `api/v1/video-lession/detail`,
      method: "GET",
      headers: HEADER.protectedMutipartHeader(),
    }),
    create: () => ({
      url: `api/v1/video-lession/create`,
      method: "POST",
      headers: HEADER.protectedMutipartHeader(),
    }),
    delete: () => ({
      url: `api/v1/video-lession/delete`,
      method: "DELETE",
      headers: HEADER.protectedMutipartHeader(),
    }),
    checkVideoUpload: () => ({
      url: `api/v1/video-lession/check-video-upload`,
      method: "POST",
      headers: HEADER.protectedMutipartHeader(),
    })
  },
  uploadVideoMp4: {
    upload: () => ({
      url: `api/v1/video/upload`,
      method: "POST",
      headers: HEADER.protectedMutipartHeader(),
    }),
  }
}