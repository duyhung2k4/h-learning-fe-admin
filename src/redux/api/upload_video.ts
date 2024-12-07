import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../query/baseQuery";
import { endPoint } from "../query/endpoint";
import { QueryReturnType } from "@/dto/base";
import { UploadVideoMp4Req } from "@/dto/request/video_lession";
import { VideoLessionModel } from "@/model/video_lession";
import { AxiosProgressEvent } from "axios";

export const uploadVideoMp4Api = createApi({
    reducerPath: "uploadVideoMp4Api",
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_UPLOAD_MP4_API || "" }),
    endpoints: (builder) => ({
        uploadVideo: builder.mutation<
            QueryReturnType<VideoLessionModel>, 
            {
                info: UploadVideoMp4Req
                onUploadProgress: (progressEvent: AxiosProgressEvent) => void
            }
        >({
            query: ({ info, onUploadProgress }) => {
                const formData = new FormData();
                formData.append("video", info.video);
                formData.append("metadata", JSON.stringify(info.metadata));

                return (
                    {
                        ...endPoint.uploadVideoMp4.upload(),
                        data: formData,
                        onUploadProgress,
                    }
                )
            },
        }),
    })
});

export const {
    useUploadVideoMutation,
} = uploadVideoMp4Api;