import React from "react";

import { Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import classes from "./style.module.css";



const Quizz: React.FC = () => {
  return (
    <Stack>
      <Group
        className={classes.option_create_quizz}
        justify="center"
        align="center"
      >
        <IconPlus />
        <Text>Thêm mới quizz</Text>
      </Group>
    </Stack>
  )
}

export default Quizz;