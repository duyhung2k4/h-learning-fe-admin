import React, { useEffect, useMemo } from "react";
import HeaderPage from "@/components/header_page";

import { ActionIcon, Button, Grid, Group, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { IconAdjustments, IconPlus, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";
import { useGetAllCourseQuery } from "@/redux/api/course";

import textStyles from "@/styles/text.module.css";
import CardCourse from "./card";



const ManagerCourse: React.FC = () => {

    const navigation = useNavigate();

    const {
        data: courseData,
        refetch,
    } = useGetAllCourseQuery(null);

    const handleCreateCourse = () => {
        navigation(ROUTER.CREATE_COURSE.href);
    }

    const courses = useMemo(() => {
        return courseData?.data || [];
    }, [courseData]);

    useEffect(() => {
        refetch();
    }, []);

    console.log(courses);



    return (
        <Stack w={"100%"} h={"100%"} gap={0}>
            <HeaderPage
                style={{
                    backgroundColor: "#151517",
                    borderBottom: "2px solid #969696",
                }}
            >
                <Stack w={"100%"} align="center">
                    <Group w={"100%"} justify="space-between">
                        <Text className={textStyles.title_page}>Quản lí khóa học</Text>
                        <Button
                            leftSection={<IconPlus />}
                            onClick={handleCreateCourse}
                        >Tạo mới</Button>
                    </Group>
                </Stack>
            </HeaderPage>
            <HeaderPage>
                <Group w={"100%"}>
                    <Group w={"100%"}>
                        <TextInput
                            flex={1}
                            placeholder="Tìm theo tên khóa học"
                            leftSection={<IconSearch />}
                        />
                        <Tooltip label="Bộ lọc">
                            <ActionIcon
                                size={45}
                                style={{ borderRadius: 8 }}
                            >
                                <IconAdjustments />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </HeaderPage>

            <Stack 
                style={{
                    padding: 16,
                    flex: 1,
                    overflowY: "scroll"
                }}
            >
                <Grid>
                    {
                        courses.map(c =>
                            <Grid.Col span={{ xs: 6 , md: 4, lg: 3 }} key={c.ID}>
                                <CardCourse {...c} />
                            </Grid.Col>
                        )
                    }
                </Grid>
            </Stack>
        </Stack>
    )
}

export default ManagerCourse;