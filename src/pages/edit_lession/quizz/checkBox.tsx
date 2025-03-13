import React from "react";

import {
  Checkbox,
  Group,
  Radio,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import classes from "./style.module.css";



export type CheckBoxEditProps = {
  isMultipleResult: boolean
  value: string
  onChange: (e: string) => void
  onDelete: () => void
}
const CheckBoxEdit: React.FC<CheckBoxEditProps> = (props) => {
  const Component = props.isMultipleResult ? Checkbox : Radio;



  return (
    <Stack>
      <Group>
        <Component
          value={props.value}
        />
        <TextInput
          value={props.value}
          flex={1}
          className={classes.input}
          onChange={e => props.onChange(e.target.value)}
        />
        <Tooltip label="Xóa đáp án">
          <IconTrash onClick={props.onDelete} />
        </Tooltip>
      </Group>
    </Stack>
  )
}

export default CheckBoxEdit;