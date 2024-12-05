import React, { useContext } from "react";

import { Group, NumberInput, Stack, Switch, Text, Textarea } from "@mantine/core";
import { IconCoin, IconFileInvoice, IconLabel, IconUsersGroup } from "@tabler/icons-react";
import { CreateCourseContext, TypeCreateCourseContext } from ".";

import classes from "./styles.module.css";



export const Setting: React.FC = () => {

    const { formEditInfoCourse } = useContext<TypeCreateCourseContext>(CreateCourseContext);
    if(!formEditInfoCourse) return



    return (
        <Stack className={classes.course_setting} gap={0}>
            <Group p={8} pl={16} pr={16} style={{ borderBottom: "2px solid #969696" }}>
                <Text className={classes.title_course_setting}>Cấu hình khóa học</Text>
            </Group>

            <Stack p={8} pl={16} pr={16} mt={20}>
                <Text
                    className={classes.title_course_setting}
                    style={{
                        fontSize: 16
                    }}
                >Thông số</Text>
            </Stack>

            <Stack p={8} pl={16} pr={16}>
                <Group
                    style={{
                        alignItems: "start",
                        justifyContent: "start",
                        padding: 8,
                        border: "2px solid #A198F3",
                        borderRadius: 8
                    }}
                    className={classes.info_config}
                    gap={6}
                >
                    <IconLabel size={30} />
                    <Textarea
                        label="Tên khóa học"
                        placeholder="Ví dụ: Khóa học A"
                        style={{
                            flex: 1
                        }}
                        autosize
                        styles={{
                            input: {
                                height: 60
                            }
                        }}
                        {...formEditInfoCourse.getInputProps("name")}
                        variant="unstyled"
                    />
                </Group>

                <Group
                    style={{
                        alignItems: "start",
                        justifyContent: "start",
                        padding: 8,
                        border: "2px solid #3B5BDB",
                        borderRadius: 8
                    }}
                    className={classes.info_config}
                    gap={6}
                >
                    <IconFileInvoice size={30} />
                    <Textarea
                        label="Giới thiệu khóa học"
                        placeholder="Ví dụ: Khóa học này..."
                        style={{
                            flex: 1
                        }}
                        autosize
                        styles={{
                            input: {
                                height: "auto"
                            }
                        }}
                        {...formEditInfoCourse.getInputProps("introduce")}
                        variant="unstyled"
                    />
                </Group>

                <Group
                    style={{
                        alignItems: "start",
                        justifyContent: "start",
                        padding: 8,
                        border: "2px solid #969696",
                        borderRadius: 8
                    }}
                    className={classes.info_config}
                    gap={6}
                >
                    <IconCoin size={30} />
                    <NumberInput
                        label="Giá trị khóa học"
                        placeholder="Ví dụ: 1.000.000"
                        style={{
                            flex: 1
                        }}
                        variant="unstyled"
                        styles={{
                            section: { display: "none" }
                        }}
                        {...formEditInfoCourse.getInputProps("value")}
                    />
                </Group>

                <Group
                    style={{
                        alignItems: "start",
                        justifyContent: "start",
                        padding: 8,
                        border: "2px solid #40C057",
                        borderRadius: 8
                    }}
                    className={classes.info_config}
                    gap={6}
                >
                    <IconUsersGroup size={30} />
                    <Stack flex={1} gap={0}>
                        <Text style={{ color: "#FFF" }}>Đa thiết bị</Text>
                        <Text>
                            Cho phép học viên đăng nhập trên nhiều thiết bị. Nếu tắt trường này, học viên chỉ đăng nhập được tối đa 3 thiết bị với cùng 1 tài khoản
                        </Text>
                    </Stack>
                    <Switch 
                        color="green" 
                        defaultChecked={formEditInfoCourse.values.multiLogin}
                        {...formEditInfoCourse.getInputProps("multiLogin")}
                    />
                </Group>
            </Stack>
        </Stack>
    )
}