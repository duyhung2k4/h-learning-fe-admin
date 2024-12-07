import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { CheckVideoUploadReq, CreateVideoLessionReq } from "@/dto/request/video_lession";
import { VideoLessionModel } from "@/model/video_lession";

export const videoLessionApi = createApi({
    reducerPath: "videoLessionApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        detailVideoLession: builder.query<QueryReturnType<VideoLessionModel>, number>({
            query: (payload) => ({
                ...endPoint.videoLession.detail(),
                params: {
                    id: payload,
                },
            }),
        }),
        createVideoLession: builder.mutation<QueryReturnType<VideoLessionModel>, CreateVideoLessionReq>({
            query: (payload) => ({
                ...endPoint.videoLession.create(),
                data: payload,
            }),
        }),
        checkVideoUpload: builder.mutation<QueryReturnType<null>, CheckVideoUploadReq>({
            query: (payload) => ({
                ...endPoint.videoLession.checkVideoUpload(),
                data: payload,
            }),
        }),
        // deleteLession: builder.mutation<QueryReturnType<LessionModel>, UpdateLessionReq>({
        //     query: (payload) => ({
        //         ...endPoint.videoLession.delete(),
        //         data: payload,
        //     })
        // }),
    })
});

export const {
    useDetailVideoLessionQuery,
    useCreateVideoLessionMutation,
    useCheckVideoUploadMutation,
} = videoLessionApi;