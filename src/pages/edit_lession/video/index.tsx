import React from "react";
import { Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import classes from "./styles.module.css";
import textClasses from "@/styles/text.module.css";



const Video: React.FC = () => {
    return (
        <Stack w={"100%"} p={16}>
            <Group
                className={classes.add_chapter}
            >
                <IconPlus size={30} />
                <Text className={textClasses.text_size_md}>Khởi tạo video</Text>
            </Group>
        </Stack>
    )
}

export default Video;