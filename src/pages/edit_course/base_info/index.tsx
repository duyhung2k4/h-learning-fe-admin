import React, { createContext, useContext, useEffect } from "react";

import { Setting } from "./setting";
import { Button, Group, Stack } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { UpdateCourseReq } from "@/dto/request/course";
import { useUpdateCourseMutation } from "@/redux/api/course";
import { useNotification } from "@/hook/notification.hook";

import { Detail } from "./detail";
import { EditCourseContext, TypeEditCourseContext } from "..";
import { convertUrlToFile } from "@/utils/file";



type EditInfoCourse = {
    name: string
    introduce: string
    description: string
    multiLogin: boolean
    value: number
    thumnail: File | null
}

const BaseInfo: React.FC = () => {

    const { course, refetchCourse } = useContext<TypeEditCourseContext>(EditCourseContext);
    if(!course) return;

    const [put, { isLoading }] = useUpdateCourseMutation();
    const noti = useNotification();

    const formEditInfoCourse = useForm<EditInfoCourse>({
        initialValues: {
            name: course.name,
            value: course.value,
            description: course.description,
            introduce: course.introduce,
            thumnail: null,
            multiLogin: course.multiLogin,
        },
        validate: {
            name: (value) => value.length === 0 ? "Tên khóa học không được bỏ trống" : null,
            thumnail: (_, values) => values.thumnail === null ? "Bạn chưa có thumnail cho khóa học" : null
        }
    });

    const setThumnailInit = async () => {
        const url = `${import.meta.env.VITE_API}/api/v1/public/file/thumnail_course/${course.thumnail}`;
        const { file, error } = await convertUrlToFile(url);
        if(error || file === null) {
            console.log(error);
            noti.error("Có lỗi khi lấy ảnh");
            return;
        }

        formEditInfoCourse.setValues({
            ...formEditInfoCourse.values,
            thumnail: file,
        })
    }

    const handleEditCourse = async (values: EditInfoCourse) => {
        console.log(values);
        if (!values.thumnail) return;

        const courseData: UpdateCourseReq = {
            metadata: {
                id: course.ID,
                name: values.name,
                description: values.description,
                multiLogin: values.multiLogin,
                value: values.value,
                introduce: values.introduce,
            },
            thumnail: values.thumnail,
        }

        const result = await put(courseData);

        if ("error" in result) {
            noti.error("Chỉnh sửa khóa học thất bại!");
            return;
        }

        noti.success("Chỉnh sửa khóa học thành công!");
        refetchCourse();
    }

    useEffect(() => {
        setThumnailInit();
    }, [course]);



    return (
        <CreateCourseContext.Provider
            value={{
                formEditInfoCourse: formEditInfoCourse,
            }}
        >
            <form
                id="update-course"
                onSubmit={formEditInfoCourse.onSubmit(handleEditCourse)}
            >
                <Stack gap={50}>
                    <Detail />
                    <Setting />
                </Stack>
            </form>
            <Group mt={24} p={16} justify="end" w={"100%"}>
                <Button
                    loading={isLoading}
                    disabled={isLoading}
                    type="submit"
                    form="update-course"
                >Cập nhật</Button>
            </Group>
        </CreateCourseContext.Provider>
    )
}

export type TypeCreateCourseContext = {
    formEditInfoCourse: UseFormReturnType<EditInfoCourse, (values: EditInfoCourse) => EditInfoCourse> | null
}

export const CreateCourseContext = createContext<TypeCreateCourseContext>({
    formEditInfoCourse: null
})

export default BaseInfo;