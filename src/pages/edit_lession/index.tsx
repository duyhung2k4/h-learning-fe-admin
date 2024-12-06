import React from "react";
import HeaderPage from "@/components/header_page";

import { Group, Stack, Text } from "@mantine/core";
import { useParams } from "react-router";

import textStyles from "@/styles/text.module.css";



const EditLession: React.FC = () => {
    const { id } = useParams();

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
                        <Text className={textStyles.title_page}>Quản lí khóa học {id}</Text>
                    </Group>
                </Stack>
            </HeaderPage>

            <Stack
                style={{
                    padding: 16,
                    flex: 1,
                    overflowY: "scroll"
                }}
            >
            </Stack>
        </Stack>
    )
}

export default EditLession;