import authSlice from "./slice/authSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import { courseApi } from "./api/course";
import { chapterApi } from "./api/chapter";
import { lessionApi } from "./api/lession";
import { videoLessionApi } from "./api/video_lession";
import { uploadVideoMp4Api } from "./api/upload_video";
import { quizzApi } from "./api/quizz";



export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [chapterApi.reducerPath]: chapterApi.reducer,
    [lessionApi.reducerPath]: lessionApi.reducer,
    [videoLessionApi.reducerPath]: videoLessionApi.reducer,
    [uploadVideoMp4Api.reducerPath]: uploadVideoMp4Api.reducer,
    [quizzApi.reducerPath]: quizzApi.reducer,
    authSlice: authSlice.reducer,
})