import { combineReducers } from "@reduxjs/toolkit";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import authSlice from "./slice/authSlice";



export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
    authSlice: authSlice.reducer,
})