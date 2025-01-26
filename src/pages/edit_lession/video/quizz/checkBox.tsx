import React, { useEffect, useState } from "react";

import {
  Checkbox,
  Group,
  Radio,
  Stack,
  TextInput,
} from "@mantine/core";

import classes from "./style.module.css";



export type CheckBoxEditProps = {
  isMultipleResult: boolean
  defaultValue: string
  onChange: (e: string) => void
}
const CheckBoxEdit: React.FC<CheckBoxEditProps> = (props) => {
  const [text, setText] = useState<string>(props.defaultValue);

  useEffect(() => {
    props.onChange(text);
  }, [text]);

  const Component = props.isMultipleResult ? Checkbox : Radio;



  return (
    <Stack>
      <Group>
        <Component
          value={text}
        />
        <TextInput
          value={text}
          flex={1}
          className={classes.input}
          onChange={e => setText(e.target.value)}
        />
      </Group>
    </Stack>
  )
}

export default CheckBoxEdit;