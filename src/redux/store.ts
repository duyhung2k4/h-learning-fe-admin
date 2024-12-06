import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { queryApi } from "./api/query";
import { authApi } from "./api/auth";
import { courseApi } from "./api/course";
import { chapterApi } from "./api/chapter";
import { lessionApi } from "./api/lession";



const middleware = [
    authApi.middleware,
    queryApi.middleware,
    courseApi.middleware,
    chapterApi.middleware,
    lessionApi.middleware,
]

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch