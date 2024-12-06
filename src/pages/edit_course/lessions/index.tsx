import React, { createContext, useContext, useRef, useState } from "react";
import ItemChapter from "./itemChapter";
import ModalCreateChapter, { ModalCreateChapterRefProps } from "./modalChapter.create";
import ModalCreateLession, { ModalCreateLessionRefProps } from "./modelLession.create";
import ModalUpdateChapter, { ModalUpdateChapterRefProps } from "./modalChapter.update";
import ModalDeleteChapter, { ModalDeleteChapterRefProps } from "./modalChapter.delete";

import { Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { EditCourseContext, TypeEditCourseContext } from "..";
import { ChapterModel } from "@/model/chapter";

import classes from "./styles.module.css";
import textClasses from "@/styles/text.module.css";



const Lessions: React.FC = () => {
    const modalCreateChapterRef = useRef<ModalCreateChapterRefProps>(null);
    const modalUpdateChapterRef = useRef<ModalUpdateChapterRefProps>(null);
    const modalDeleteChapterRef = useRef<ModalDeleteChapterRefProps>(null);
    const modalCreateLessionRef = useRef<ModalCreateLessionRefProps>(null);

    const [curChapter, setCurChapter] = useState<ChapterModel | null>(null);
    const { chapters } = useContext<TypeEditCourseContext>(EditCourseContext);

    const openModalCreateChapter = () => {
        modalCreateChapterRef.current?.changeStatusModal(true);
    }



    return (
        <LessionContext.Provider
            value={{
                curChapter,
                modalCreateChapterRef,
                modalUpdateChapterRef,
                modalDeleteChapterRef,
                modalCreateLessionRef,
                setCurChapter,
            }}
        >
            <Stack p={16} w={"100%"}>
                {chapters.length > 0 &&
                    <Group w={"100%"} justify="center">
                        <Text className={textClasses.text_size_md}>Danh sách các chương</Text>
                    </Group>
                }
                {chapters.map(c => <ItemChapter key={c.ID} {...c} />)}
                <Group
                    className={classes.add_chapter}
                    onClick={openModalCreateChapter}
                >
                    <IconPlus size={30} />
                    <Text className={textClasses.text_size_md}>Thêm mới 1 chương</Text>
                </Group>
            </Stack>

            <ModalCreateChapter ref={modalCreateChapterRef} />
            <ModalUpdateChapter ref={modalUpdateChapterRef} />
            <ModalDeleteChapter ref={modalDeleteChapterRef}/>
            <ModalCreateLession ref={modalCreateLessionRef} />
        </LessionContext.Provider>
    )
}

export type TypeLessionContext = {
    curChapter: ChapterModel | null
    modalCreateChapterRef: React.RefObject<ModalCreateChapterRefProps> | null
    modalUpdateChapterRef: React.RefObject<ModalUpdateChapterRefProps> | null
    modalDeleteChapterRef: React.RefObject<ModalDeleteChapterRefProps> | null
    modalCreateLessionRef: React.RefObject<ModalCreateLessionRefProps> | null
    setCurChapter: (value: ChapterModel | null) => void
}

export const LessionContext = createContext<TypeLessionContext>({
    curChapter: null,
    modalCreateChapterRef: null,
    modalUpdateChapterRef: null,
    modalDeleteChapterRef: null,
    modalCreateLessionRef: null,
    setCurChapter: (_) => { },
})

export default Lessions;