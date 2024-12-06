import React, { createContext, useContext, useRef, useState } from "react";
import ItemChapter from "./itemChapter";
import ModalCreateChapter, { ModalCreateChapterRefProps } from "./modalChapter.create";
import ModalCreateLession, { ModalCreateLessionRefProps } from "./modelLession.create";

import { Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { EditCourseContext, TypeEditCourseContext } from "..";
import { ChapterModel } from "@/model/chapter";

import classes from "./styles.module.css";
import textClasses from "@/styles/text.module.css";



const Lessions: React.FC = () => {
    const modalCreateChapterRef = useRef<ModalCreateChapterRefProps>(null);
    const modelCreateLessionRef = useRef<ModalCreateLessionRefProps>(null);

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
                modelCreateLessionRef,
                setCurChapter,
            }}
        >
            <Stack p={16} w={"100%"}>
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
            <ModalCreateLession ref={modelCreateLessionRef} />
        </LessionContext.Provider>
    )
}

export type TypeLessionContext = {
    curChapter: ChapterModel | null
    modalCreateChapterRef: React.RefObject<ModalCreateChapterRefProps> | null
    modelCreateLessionRef: React.RefObject<ModalCreateLessionRefProps> | null
    setCurChapter: (value: ChapterModel | null) => void
}

export const LessionContext = createContext<TypeLessionContext>({
    curChapter: null,
    modalCreateChapterRef: null,
    modelCreateLessionRef: null,
    setCurChapter: (_) => { },
})

export default Lessions;