import axios from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: import.meta.env.VITE_API || "" }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
            onUploadProgress?: AxiosRequestConfig['onUploadProgress']
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers, onUploadProgress }) => {
            try {
                const result = await axios({
                    url: `${baseUrl}/${url}`,
                    method,
                    data,
                    params,
                    headers,
                    onUploadProgress,
                })
                return { data: result.data }
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }