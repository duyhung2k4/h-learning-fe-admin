import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { ChapterModel } from "@/model/chapter";
import { CreateChapterReq, UpdateChapterReq } from "@/dto/request/chapter";

export const chapterApi = createApi({
    reducerPath: "chapterApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getChapterByCourseId: builder.query<QueryReturnType<ChapterModel[]>, number>({
            query: (payload) => ({
                ...endPoint.chapter.getByCourseId(),
                params: {
                    id: payload,
                }
            }),
        }),
        createChapter: builder.mutation<QueryReturnType<ChapterModel>, CreateChapterReq>({
            query: (payload) => ({
                ...endPoint.chapter.create(),
                data: payload,
            }),
        }),
        updateChapter: builder.mutation<QueryReturnType<ChapterModel>, UpdateChapterReq>({
            query: (payload) => ({
                ...endPoint.chapter.update(),
                data: payload,
            })
        }),
    })
});

export const {
    useGetChapterByCourseIdQuery,
    useCreateChapterMutation,
    useUpdateChapterMutation,
} = chapterApi;