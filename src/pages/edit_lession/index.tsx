import React, { useEffect, useMemo, useState } from "react";
import HeaderPage from "@/components/header_page";

import { Group, Stack, Tabs, Text, Tooltip } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { useGetDetailLessionQuery } from "@/redux/api/lession";
import { IconSquareXFilled } from "@tabler/icons-react";
import { ROUTER } from "@/constants/router";

import textStyles from "@/styles/text.module.css";
import tabsClasses from "@/styles/tabs.module.css";
import BaseInfo from "./base_info";
import Document from "./document";
import Quizz from "./quizz";
import Video from "./video";



const EditLession: React.FC = () => {
    const { id } = useParams();

    const [hash, setHash] = useState<string>(
        window.location.hash ||
        ROUTER.EDIT_LESSION.hash?.baseInfo || ""
    );

    const {
        data,
        refetch,
    } = useGetDetailLessionQuery(Number(id));

    const navigation = useNavigate();

    const lession = useMemo(() => {
        return data?.data;
    }, [data]);

    const handleClose = () => {
        if (!lession) return;

        const urlCourse = ROUTER.EDIT_COURSE.href.replace(":id", `${lession.courseId}`);
        const hash = ROUTER.EDIT_COURSE.hash?.lessions;
        const url = `${urlCourse}${hash}`;
        navigation(url);
    }

    useEffect(() => {
        window.location.hash = hash;
    }, [hash]);

    useEffect(() => {
        refetch();

        const curHash = window.location.hash;
        if (curHash === "") {
            window.location.hash = ROUTER.EDIT_LESSION.hash?.baseInfo || "";
            setHash(ROUTER.EDIT_LESSION.hash?.baseInfo || "");
        } else {
            setHash(curHash);
        }
    }, []);



    return (
        <Stack w={"100%"} h={"100%"} gap={0}>
            <HeaderPage
                style={{
                    backgroundColor: "#151517",
                    borderBottom: "2px solid #969696",
                }}
            >
                <Stack w={"100%"} align="center">
                    <Group w={"100%"} justify="space-between" align="center">
                        <Text
                            className={textStyles.title_page}
                            flex={1}
                            maw={"100%"}
                        >
                            {lession?.course?.name} - {lession?.chapter?.name} - {lession?.name}
                        </Text>

                        <Tooltip label="Đóng">
                            <IconSquareXFilled
                                style={{ cursor: "pointer" }}
                                size={30}
                                onClick={handleClose}
                            />
                        </Tooltip>
                    </Group>
                </Stack>
            </HeaderPage>

            <Stack
                style={{
                    height: "calc(100vh - 37.2px - 16px * 2)"
                }}
            >
                <Tabs
                    value={hash}
                    onChange={e => setHash(e || ROUTER.EDIT_LESSION.hash?.baseInfo || "")}
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
                        <Tabs.Tab value={ROUTER.EDIT_LESSION.hash?.baseInfo || ""}>
                            Thông tin cơ bản
                        </Tabs.Tab>
                        <Tabs.Tab value={ROUTER.EDIT_LESSION.hash?.video || ""}>
                            Video
                        </Tabs.Tab>
                        <Tabs.Tab value={ROUTER.EDIT_LESSION.hash?.document || ""}>
                            Tài liệu
                        </Tabs.Tab>
                        <Tabs.Tab value={ROUTER.EDIT_LESSION.hash?.quizz || ""}>
                            Quizz
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={ROUTER.EDIT_LESSION.hash?.baseInfo || ""}>
                        <BaseInfo />
                    </Tabs.Panel>
                    <Tabs.Panel value={ROUTER.EDIT_LESSION.hash?.document || ""}>
                        <Document />
                    </Tabs.Panel>
                    <Tabs.Panel value={ROUTER.EDIT_LESSION.hash?.video || ""}>
                        <Video />
                    </Tabs.Panel>
                    <Tabs.Panel value={ROUTER.EDIT_LESSION.hash?.quizz || ""}>
                        <Quizz />
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Stack>
    )
}

export default EditLession;