import React, { createContext, useEffect, useMemo, useState } from "react";
import HeaderPage from "@/components/header_page";
import BaseInfo from "./base_info";
import Lessions from "./lessions";
import Vouchers from "./vouchers";

import { ROUTER } from "@/constants/router";
import { Group, Stack, Tabs, Text, Tooltip } from "@mantine/core";
import { IconSquareXFilled } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useDetailCourseQuery } from "@/redux/api/course";
import { CourseModel } from "@/model/course";
import { useGetChapterByCourseIdQuery } from "@/redux/api/chapter";
import { ChapterModel } from "@/model/chapter";

import textClasses from "@/styles/text.module.css";
import tabsClasses from "@/styles/tabs.module.css";



const EditCourse: React.FC = () => {

    const navigation = useNavigate();

    const [hash, setHash] = useState<string>(
        window.location.hash ||
        ROUTER.EDIT_COURSE.hash?.baseInfo || ""
    );

    const { id } = useParams();
    if (!id) return;

    const {
        data: dataCourse,
        refetch: refetchCourse,
    } = useDetailCourseQuery(Number(id));

    const {
        data: dataChapter,
        refetch: refetchChapters
    } = useGetChapterByCourseIdQuery(Number(id));


    const course = useMemo(() => {
        return dataCourse?.data
    }, [dataCourse]);
    const chapters = useMemo(() => {
        return dataChapter?.data || [];
    }, [dataChapter]);
    
    
    useEffect(() => {
        window.location.hash = hash;
    }, [hash]);
    
    useEffect(() => {
        refetchCourse();
        refetchChapters();
        
        const curHash = window.location.hash;
        if (curHash === "") {
            window.location.hash = ROUTER.EDIT_COURSE.hash?.baseInfo || "";
            setHash(ROUTER.EDIT_COURSE.hash?.baseInfo || "");
        } else {
            setHash(curHash);
        }
    }, []);

    if (!course) return;



    return (
        <EditCourseContext.Provider
            value={{
                course,
                chapters,
                refetchCourse,
                refetchChapters,
            }}
        >
            <Stack w={"100%"} h={"100%"} gap={0} p={0}>
                <HeaderPage
                    style={{
                        backgroundColor: "#151517",
                        borderBottom: "2px solid #969696",
                    }}
                >
                    <Group w={"100%"} justify="space-between">
                        <Text className={textClasses.title_page}>Cấu hình khóa học</Text>
                        <Tooltip label="Đóng">
                            <IconSquareXFilled
                                style={{ cursor: "pointer" }}
                                onClick={() => navigation(ROUTER.MANAGER_COURSE.href)}
                            />
                        </Tooltip>
                    </Group>
                </HeaderPage>

                <Stack
                    style={{
                        height: "calc(100vh - 37.2px - 16px * 2)"
                    }}
                >
                    <Tabs
                        value={hash}
                        onChange={e => setHash(e || ROUTER.EDIT_COURSE.hash?.baseInfo || "")}
                        p={0}
                        pl={16}
                        h={"100%"}
                        mah={"100%"}
                        className={tabsClasses.root}
                        styles={{
                            panel: {
                                maxHeight: "100%",
                                overflowY: "scroll"
                            }
                        }}
                        orientation="vertical"
                    >
                        <Tabs.List pt={16}>
                            <Tabs.Tab value={ROUTER.EDIT_COURSE.hash?.baseInfo || ""}>
                                Thông tin cơ bản
                            </Tabs.Tab>
                            <Tabs.Tab value={ROUTER.EDIT_COURSE.hash?.lessions || ""}>
                                Bài học
                            </Tabs.Tab>
                            <Tabs.Tab value={ROUTER.EDIT_COURSE.hash?.vouchers || ""}>
                                Khuyến mãi
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value={ROUTER.EDIT_COURSE.hash?.baseInfo || ""}>
                            <BaseInfo />
                        </Tabs.Panel>
                        <Tabs.Panel value={ROUTER.EDIT_COURSE.hash?.lessions || ""}>
                            <Lessions />
                        </Tabs.Panel>
                        <Tabs.Panel value={ROUTER.EDIT_COURSE.hash?.vouchers || ""}>
                            <Vouchers />
                        </Tabs.Panel>
                    </Tabs>
                </Stack>
            </Stack>
        </EditCourseContext.Provider>
    )
}

export type TypeEditCourseContext = {
    course: CourseModel | null
    chapters: ChapterModel[]
    refetchCourse: () => void
    refetchChapters: () => void
}

export const EditCourseContext = createContext<TypeEditCourseContext>({
    course: null,
    chapters: [],
    refetchCourse: () => {},
    refetchChapters: () => {},
})

export default EditCourse;