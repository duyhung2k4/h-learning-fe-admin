import authSlice from "./slice/authSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import { courseApi } from "./api/course";
import { chapterApi } from "./api/chapter";
import { lessionApi } from "./api/lession";



export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [chapterApi.reducerPath]: chapterApi.reducer,
    [lessionApi.reducerPath]: lessionApi.reducer,
    authSlice: authSlice.reducer,
})