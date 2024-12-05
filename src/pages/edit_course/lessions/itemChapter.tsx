import React, { useEffect, useRef, useState } from "react";

import { Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { ChapterModel } from "@/model/chapter";

import classes from "./styles.module.css";
import textClasses from "@/styles/text.module.css";



const ItemChapter: React.FC<ChapterModel> = (props) => {
    const ref = useRef<HTMLDivElement>(null);

    const [showAction, setShowAction] = useState<boolean>(false);

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
        <Group
            ref={ref}
            key={props.ID}
            gap={16}
            className={classes.item_chapter}
        >
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
                        <IconEdit/>
                    </Tooltip>
                    <Tooltip label="Xóa bỏ">
                        <IconTrash/>
                    </Tooltip>
                </Group>
            }
        </Group>
    )
}

export default ItemChapter;