import React, { useContext, useEffect, useRef } from "react";
import DropzoneCustom, { DropzoneCustomRef } from "@/components/dropzone";
import EditorCustom from "@/components/editor";

import { Stack, Text } from "@mantine/core";
import { CreateCourseContext, TypeCreateCourseContext } from ".";

import classes from "./styles.module.css";



export const Detail: React.FC = () => {
    const dropzoneRef = useRef<DropzoneCustomRef>(null);

    const { formEditInfoCourse } = useContext<TypeCreateCourseContext>(CreateCourseContext);
    if (!formEditInfoCourse) return

    const handleChangeEditer = (e: string) => {
        formEditInfoCourse.setValues({
            ...formEditInfoCourse.values,
            description: e,
        })
    }

    useEffect(() => {
        const thumnail = formEditInfoCourse.values.thumnail;
        if(!thumnail) return;
        dropzoneRef.current?.changeFiles([thumnail]);
    }, [formEditInfoCourse.values.thumnail]);



    return (
        <Stack w={"100%"} p={8}>
            <Stack gap={0}>
                {formEditInfoCourse.errors.thumnail && <Text style={{ color: "red" }}>{formEditInfoCourse.errors.thumnail}</Text>}
                <DropzoneCustom
                    ref={dropzoneRef}
                    dropzoneProps={{}}
                    multiple={false}
                    title="Tải thumnail của khóa học"
                    onDrop={(files) => {
                        formEditInfoCourse.setValues({
                            ...formEditInfoCourse.values,
                            thumnail: files[0],
                        })
                    }}
                />
            </Stack>

            <Stack w={"100%"} gap={0} mt={24}>
                <Text className={classes.title_course_detail}>Mô tả khóa học</Text>
                <EditorCustom
                    defaultContent={formEditInfoCourse.values.description}
                    onChange={handleChangeEditer}
                />
            </Stack>
        </Stack>
    )
}