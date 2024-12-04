import React from "react";

import { Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import { CourseModel } from "@/model/course";

import classes from "./style.module.css";



const CardCourse: React.FC<CourseModel> = (props) => {
    const urlThumnail = `${import.meta.env.VITE_API}/api/v1/public/file/thumnail_course/${props.thumnail}`;

    return (
        <Card shadow="sm" bg={"#0C0C0C"} h={"100%"} padding={16} radius="md">
            <Card.Section>
                <Image
                    src={urlThumnail}
                    height={200}
                    alt="Norway"
                />
            </Card.Section>

            <Stack h={"100%"} justify="space-between">
                <Stack gap={0}>
                    <Group justify="space-between" mt="md" mb="xs">
                        <Text
                            className={classes.title_course_card}
                            fw={600}
                            c={"#FFF"}
                        >{props.name}</Text>
                    </Group>

                    <Text
                        size="sm"
                        c="dimmed"
                        className={classes.introduce_course_card}
                    >
                        {props.introduce}
                    </Text>
                </Stack>

                <Button fullWidth mt="md" radius="md">
                    Chi tiết
                </Button>
            </Stack>
        </Card>
    )
}

export default CardCourse;