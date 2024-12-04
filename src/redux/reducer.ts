import authSlice from "./slice/authSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import { courseApi } from "./api/course";



export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    authSlice: authSlice.reducer,
})