import React, { useContext, useEffect, useRef, useState } from "react";

import { Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconCaretDownFilled, IconEdit, IconNotes, IconPlus, IconTrash } from "@tabler/icons-react";
import { ChapterModel } from "@/model/chapter";
import { LessionContext, TypeLessionContext } from ".";
import { useNavigate } from "react-router";

import classes from "./styles.module.css";
import textClasses from "@/styles/text.module.css";
import { ROUTER } from "@/constants/router";



const ItemChapter: React.FC<ChapterModel> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const refShowLession = useRef<HTMLDivElement>(null);
    const refLessions = useRef<HTMLDivElement>(null);

    const navigation = useNavigate();

    const {
        modalCreateLessionRef,
        modalUpdateChapterRef,
        modalDeleteChapterRef,
        setCurChapter,
    } = useContext<TypeLessionContext>(LessionContext);

    const [showAction, setShowAction] = useState<boolean>(false);
    const [showLessions, setShowLessions] = useState<boolean>(false);

    const openModalCreateLession = () => {
        setCurChapter(props);
        modalCreateLessionRef?.current?.changeStatusModal(true);
    }

    const openModalUpdateChapter = () => {
        setCurChapter(props);
        modalUpdateChapterRef?.current?.changeStatusModal(true);
    }

    const openModalDeleteChapter = () => {
        setCurChapter(props);
        modalDeleteChapterRef?.current?.changeStatusModal(true);
    }

    const gotoEditLession = (lessionId: number) => {
        const url = ROUTER.EDIT_LESSION.href.replace(":id", `${lessionId}`);
        navigation(url);
    }

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener("mouseenter", () => setShowAction(true))
        element.addEventListener("mouseleave", () => setShowAction(false))

        return () => {
            element.removeEventListener("mouseenter", () => setShowAction(false));
            element.removeEventListener("mouseleave", () => setShowAction(false));
        }
    }, [ref]);



    return (
        <Stack
            ref={ref}
            key={props.ID}
            gap={0}
            onClick={() => {
                if(!showLessions) setShowLessions(true);
            }}
            className={`${classes.item_chapter} ${showLessions && classes.item_chapter_active}`}
        >
            <Group w={"100%"} p={16}>
                <Stack
                    gap={0}
                    style={{
                        flex: 1,
                        maxWidth: "100%"
                    }}
                >
                    <Text
                        className={`${textClasses.limit_1_line} ${textClasses.text_size_sm}`}
                    >{props.name}</Text>
                    <Text className={textClasses.limit_1_line}>{props.description}</Text>
                </Stack>

                {showAction &&
                    <Group gap={8}>
                        <Tooltip label="Chỉnh sửa">
                            <IconEdit onClick={openModalUpdateChapter} />
                        </Tooltip>
                        <Tooltip label="Xóa bỏ">
                            <IconTrash onClick={openModalDeleteChapter} />
                        </Tooltip>
                    </Group>
                }
            </Group>

            <Stack
                className={classes.list_lession}
                style={{
                    borderTop: showLessions ? "1px solid #969696" : 0,
                    padding: showLessions ? 16 : 0,
                    maxHeight: showLessions ? refLessions.current?.scrollHeight : 0,
                }}
            >
                <Stack gap={4}>
                    {
                        props.lessions.map(l =>
                            <Group
                                key={l.ID}
                                className={classes.item_lession}
                                onClick={() => gotoEditLession(l.ID)}
                            >
                                <IconNotes />
                                <Text
                                    flex={1}
                                    maw={"100%"}
                                    className={textClasses.limit_1_line}
                                >{l.name}</Text>
                            </Group>
                        )
                    }
                </Stack>
                <Group
                    justify="center"
                    gap={4}
                    style={{
                        backgroundColor: "#8E05C1",
                        borderRadius: 8,
                        cursor: "pointer",
                    }}
                    onClick={openModalCreateLession}
                >
                    <IconPlus size={24} />
                    <Text fw={600} c={"#FFF"}>Thêm mới bài học</Text>
                </Group>
            </Stack>

            <Group
                ref={refShowLession}
                className={`${classes.item_chapter_show_lession}`}
                style={{
                    maxHeight:
                        showAction ?
                            refShowLession.current?.scrollHeight :
                            (showLessions ? refShowLession.current?.scrollHeight : 0),
                }}
            >
                <Tooltip label={showLessions ? "Thu gọn" : "Mở rộng"}>
                    <IconCaretDownFilled
                        style={{
                            transform: `rotate(${showLessions ? 180 : 0}deg)`
                        }}
                        onClick={() => setShowLessions(!showLessions)}
                    />
                </Tooltip>
            </Group>
        </Stack>
    )
}

export default ItemChapter;