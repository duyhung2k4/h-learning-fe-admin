import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { LessionModel } from "@/model/lession";
import { CreateLessionReq, UpdateLessionReq } from "@/dto/request/lession";

export const lessionApi = createApi({
    reducerPath: "lessionApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getLessionByChapterId: builder.query<QueryReturnType<LessionModel[]>, number>({
            query: (payload) => ({
                ...endPoint.lession.getByCourseId(),
                params: {
                    id: payload,
                }
            }),
        }),
        createLession: builder.mutation<QueryReturnType<LessionModel>, CreateLessionReq>({
            query: (payload) => ({
                ...endPoint.lession.create(),
                data: payload,
            }),
        }),
        updateLession: builder.mutation<QueryReturnType<LessionModel>, UpdateLessionReq>({
            query: (payload) => ({
                ...endPoint.lession.update(),
                data: payload,
            })
        }),
    })
});

export const {
    useGetLessionByChapterIdQuery,
    useCreateLessionMutation,
    useUpdateLessionMutation,
} = lessionApi;