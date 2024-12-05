import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { CreateCourseReq, UpdateCourseReq } from "@/dto/request/course";
import { CourseModel } from "@/model/course";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        createCourse: builder.mutation<QueryReturnType<CourseModel>, CreateCourseReq>({
            query: (payload) => {
                const formData = new FormData();
                formData.append("thumnail", payload.thumnail);
                formData.append("metadata", JSON.stringify(payload.metadata));

                return ({
                    ...endPoint.course.create(),
                    data: formData,
                })
            },
        }),
        updateCourse: builder.mutation<QueryReturnType<CourseModel>, UpdateCourseReq>({
            query: (payload) => {
                const formData = new FormData();
                formData.append("thumnail", payload.thumnail);
                formData.append("metadata", JSON.stringify(payload.metadata));

                return ({
                    ...endPoint.course.update(),
                    data: formData,
                })
            },
        }),
        getAllCourse: builder.query<QueryReturnType<CourseModel[]>, null>({
            query: () => ({
                ...endPoint.course.getAll(),
            }),
        }),
        detailCourse: builder.query<QueryReturnType<CourseModel>, number>({
            query: (payload) => ({
                ...endPoint.course.detail(),
                params: {
                    id: payload,
                }
            }),
        }),
    })
});

export const {
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useGetAllCourseQuery,
    useDetailCourseQuery,
} = courseApi;