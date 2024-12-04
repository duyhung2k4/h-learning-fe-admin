import Cookies from "js-cookie";

import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_TYPE } from "@/model/variable";
import { authApi } from "../api/auth";
import { ProfileModel } from "@/model/profile";



interface AuthState {
    profile?: ProfileModel
}

const initialState: AuthState = {
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.profile = payload.data?.profile;

            if (payload.data?.accessToken && payload.data?.refreshToken) {
                Cookies.set(TOKEN_TYPE.ACCESS_TOKEN, payload.data.accessToken, { expires: 1 });
                Cookies.set(TOKEN_TYPE.REFRESH_TOKEN, payload.data.refreshToken, { expires: 3 });
            }
        }),

            builder.addMatcher(authApi.endpoints.login.matchRejected, (state, _) => {
                state.profile = undefined;
                Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
                Cookies.remove(TOKEN_TYPE.REFRESH_TOKEN);
            }),

            builder.addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, { payload }) => {
                state.profile = payload.data?.profile;

                if (payload.data?.accessToken && payload.data?.refreshToken) {
                    Cookies.set(TOKEN_TYPE.ACCESS_TOKEN, payload.data.accessToken, { expires: 1 });
                    Cookies.set(TOKEN_TYPE.REFRESH_TOKEN, payload.data.refreshToken, { expires: 3 });
                }
            }),
            
            builder.addMatcher(authApi.endpoints.refreshToken.matchRejected, (state, _) => {
                state.profile = undefined;
                Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
                Cookies.remove(TOKEN_TYPE.REFRESH_TOKEN);
            })
    }
})

export default authSlice;