import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReq } from "@/dto/request/query";
import { QueryReturnType } from "@/dto/base";



export const queryApi = createApi({
    reducerPath: "queryApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        query: builder.mutation<QueryReturnType, UseQueryMutationPayload>({
            query: (payload: UseQueryMutationPayload) => ({
                ...endPoint.query.query(payload.model),
                data: payload.data,
            }),
        }),
    })
});

export const {
    useQueryMutation,
} = queryApi;

export type UseQueryMutationPayload = {
    model: string
    data: QueryReq
}

export const DEFAULT_QUERY_DATA: QueryReq = {
    data: {},
    method: "get",
    condition: "",
    args: [],
    preload: [],
    omit: {},
    order: "",
}