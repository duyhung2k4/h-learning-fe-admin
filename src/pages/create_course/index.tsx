import React, { createContext } from "react";
import HeaderPage from "@/components/header_page";

import { Setting } from "./setting";
import { Button, Grid, Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconSquareXFilled } from "@tabler/icons-react";
import { Detail } from "./detail";
import { useForm, UseFormReturnType } from "@mantine/form";
import { CreateCourseReq } from "@/dto/request/course";
import { useCreateCourseMutation } from "@/redux/api/course";
import { useNavigate } from "react-router";
import { useNotification } from "@/hook/notification.hook";
import { ROUTER } from "@/constants/router";

import textClasses from "@/styles/text.module.css";



type InfoCourse = {
    name: string
    introduce: string
    description: string
    multiLogin: boolean
    value: number
    thumnail: File | null
}

const CreateCourse: React.FC = () => {

    const [post, { isLoading }] = useCreateCourseMutation();
    const navigation = useNavigate();
    const noti = useNotification();

    const formInfoCourse = useForm<InfoCourse>({
        initialValues: {
            name: "",
            value: 0,
            description: "",
            introduce: "",
            thumnail: null,
            multiLogin: true,
        },
        validate: {
            name: (value) => value.length === 0 ? "Tên khóa học không được bỏ trống" : null,
            thumnail: (_, values) => values.thumnail === null ? "Bạn chưa có thumnail cho khóa học" : null
        }
    });

    const handleCreateCourse = async (values: InfoCourse) => {
        if (!values.thumnail) return;

        const courseData: CreateCourseReq = {
            metadata: {
                name: values.name,
                description: values.description,
                multiLogin: values.multiLogin,
                value: values.value,
                introduce: values.introduce,
            },
            thumnail: values.thumnail,
        }

        const result = await post(courseData);

        if ("error" in result) {
            noti.error("Tạo khóa học thất bại!");
            return;
        }

        noti.success("Tạo khóa học thành công!");
        navigation(ROUTER.MANAGER_COURSE.href);
    }



    return (
        <CreateCourseContext.Provider
            value={{
                formInfoCourse: formInfoCourse,
            }}
        >
            <form 
                id="create-course" 
                style={{ 
                    height: "100%",
                    width: "100%"
                }} 
                onSubmit={formInfoCourse.onSubmit(handleCreateCourse)}
            >
                <Stack w={"100%"} h={"100%"} gap={0}>
                    <HeaderPage
                        style={{
                            backgroundColor: "#151517",
                            borderBottom: "2px solid #969696",
                        }}
                    >
                        <Group w={"100%"} justify="space-between">
                            <Tooltip label="Hủy">
                                <IconSquareXFilled
                                    size={30}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        navigation(ROUTER.MANAGER_COURSE.href);
                                    }}
                                />
                            </Tooltip>
                            <Text className={textClasses.title_page}>Thêm mới khóa học</Text>
                            <Button
                                type="submit"
                                form="create-course"
                                loading={isLoading}
                                disabled={isLoading}
                            >Xác nhận</Button>
                        </Group>
                    </HeaderPage>
                    <Stack
                        style={{
                            flex: 1,
                            overflowX: "hidden",
                            overflowY: "scroll",
                        }}
                    >
                        <Grid 
                            gutter={5}
                            mih={"100%"}
                        >
                            <Grid.Col span={{ md: 7, lg: 8 }}>
                                <Detail />
                            </Grid.Col>

                            <Grid.Col span={{ md: 5, lg: 4 }}>
                                <Setting />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Stack>
            </form>
        </CreateCourseContext.Provider>
    )
}

export type TypeCreateCourseContext = {
    formInfoCourse: UseFormReturnType<InfoCourse, (values: InfoCourse) => InfoCourse> | null
}

export const CreateCourseContext = createContext<TypeCreateCourseContext>({
    formInfoCourse: null
})

export default CreateCourse;