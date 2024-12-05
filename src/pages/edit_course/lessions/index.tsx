import React, { useContext, useRef } from "react";
import ModalCreateChapter, { ModalCreateChapterRefProps } from "./modalChapter.create";

import { Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { EditCourseContext, TypeEditCourseContext } from "..";

import classes from "./styles.module.css";
import textClasses from "@/styles/text.module.css";
import ItemChapter from "./itemChapter";



const Lessions: React.FC = () => {
    const modalCreateChapterRef = useRef<ModalCreateChapterRefProps>(null);

    const { chapters } = useContext<TypeEditCourseContext>(EditCourseContext);

    const openModalCreateChapter = () => {
        modalCreateChapterRef.current?.changeStatusModal(true);
    }



    return (
        <>
            <Stack p={16} w={"100%"}>
                {chapters.map(c => <ItemChapter key={c.ID} {...c}/>)}
                <Group 
                    className={classes.add_chapter}
                    onClick={openModalCreateChapter}
                >
                    <IconPlus size={30} />
                    <Text className={textClasses.text_size_md}>Thêm mới 1 chương</Text>
                </Group>
            </Stack>

            <ModalCreateChapter ref={modalCreateChapterRef} />
        </>
    )
}

export default Lessions;