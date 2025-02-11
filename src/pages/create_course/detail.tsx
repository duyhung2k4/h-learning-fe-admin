import React, { useContext } from "react";
import DropzoneCustom from "@/components/dropzone";
import EditorCustom from "@/components/editor";

import { Stack, Text } from "@mantine/core";
import { CreateCourseContext, TypeCreateCourseContext } from ".";

import classes from "./styles.module.css";



export const Detail: React.FC = () => {

    const { formInfoCourse } = useContext<TypeCreateCourseContext>(CreateCourseContext);
    if (!formInfoCourse) return

    const handleChangeEditer = (e: string) => {
        formInfoCourse.setValues({
            ...formInfoCourse.values,
            description: e,
        })
    }




    return (
        <Stack w={"100%"} h={"100%"} p={8}>
            <Stack gap={0}>
                {formInfoCourse.errors.thumnail && <Text style={{ color: "red" }}>{formInfoCourse.errors.thumnail}</Text>}
                <DropzoneCustom
                    dropzoneProps={{}}
                    multiple={false}
                    title="Tải thumnail của khóa học"
                    onDrop={(files) => {
                        formInfoCourse.setValues({
                            ...formInfoCourse.values,
                            thumnail: files[0],
                        })
                    }}
                />
            </Stack>

            <Stack w={"100%"} gap={0} mt={24}>
                <Text className={classes.title_course_detail}>Mô tả khóa học</Text>
                <EditorCustom
                    onChange={handleChangeEditer}
                />
            </Stack>
        </Stack>
    )
}