import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { QuizzModel } from "@/model/quizz";
import { CreateQuizzRequest, DeleteQuizzRequest, UpdateQuizzRequest } from "@/dto/request/quizz";

export const quizzApi = createApi({
  reducerPath: "quizzApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getQuizzById: builder.query<QueryReturnType<QuizzModel>, number>({
      query: (payload) => ({
        ...endPoint.quizz.getById(),
        params: {
          id: payload
        }
      }),
    }),
    getQuizzByEntityId: builder.query<QueryReturnType<QuizzModel[]>, number>({
      query: (payload) => ({
        ...endPoint.quizz.getByEntityId(),
        params: {
          id: payload,
          type: "QUIZZ_LESSION",
        }
      }),
    }),
    createQuizz: builder.mutation<QueryReturnType<QuizzModel>, CreateQuizzRequest>({
      query: (payload) => ({
        ...endPoint.quizz.create(),
        data: payload,
      }),
    }),
    updateQuizz: builder.mutation<QueryReturnType<QuizzModel>, UpdateQuizzRequest>({
      query: (payload) => ({
        ...endPoint.quizz.update(),
        data: payload,
      })
    }),
    deleteQuizz: builder.mutation<QueryReturnType<QuizzModel>, DeleteQuizzRequest>({
      query: (payload) => ({
        ...endPoint.quizz.update(),
        data: payload,
      })
    }),
  })
});

export const {
  useGetQuizzByIdQuery,
  useGetQuizzByEntityIdQuery,
  useCreateQuizzMutation,
  useUpdateQuizzMutation,
  useDeleteQuizzMutation,
} = quizzApi;