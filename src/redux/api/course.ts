import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { CreateCourseReq } from "@/dto/request/course";
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
    })
});

export const {
    useCreateCourseMutation,
} = courseApi;