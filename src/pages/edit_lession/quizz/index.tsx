import React, { useEffect, useState } from "react";
import CheckBoxEdit from "./checkBox";

import {
  Button,
  Checkbox,
  Group,
  Radio,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";

import classes from "./style.module.css";
import textClasses from "@/styles/text.module.css";

type FormCreateQuizz = {
  ask: string
  options: string[]
  results: string[]
  isMultipleResult: boolean
  time: number
}



const QuizzVideo: React.FC = () => {
  const [isMultipleResult, setIsMultipleResult] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>(["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"]);



  const formCreateQuizz = useForm<FormCreateQuizz>({
    initialValues: {
      ask: "",
      results: [],
      options: [],
      isMultipleResult: false,
      time: 0,
    },
  });



  const Component = isMultipleResult ? Checkbox.Group : Radio.Group;

  useEffect(() => {
    if (!isMultipleResult && formCreateQuizz.values.results.length > 1) {
      formCreateQuizz.setValues({
        ...formCreateQuizz.values,
        results: [formCreateQuizz.values.results[0]]
      })
    }
    setOptions(options);
  }, [isMultipleResult, options]);



  return (
    <Stack p={16}>
      <Group
        className={classes.option_create_quizz}
        justify="center"
        align="center"
      >
        <Group>
          <IconPlus />
          <Text>Thêm mới quizz</Text>
        </Group>
      </Group>
      <Stack
        p={16}
        className={classes.quizz_setting}
      >
        <form>
          <Stack gap={16}>
            <Textarea
              placeholder="Nhập câu hỏi"
              autosize
              styles={{
                input: {
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              }}
              {...formCreateQuizz.getInputProps("ask")}
            />
            <Group>
              <Text className={textClasses.text_size_xs}>Nhiều đáp án</Text>
              <Switch
                {...formCreateQuizz.getInputProps("isMultipleResult")}
                onChange={e => setIsMultipleResult(e.currentTarget.checked)}
              />
            </Group>
            <Component
              value={
                isMultipleResult
                  ? formCreateQuizz.values.results as any
                  : (formCreateQuizz.values.results.length > 0 ? formCreateQuizz.values.results[0] as any : undefined)
              }
              onChange={e => {
                formCreateQuizz.setValues({
                  ...formCreateQuizz.values,
                  results: typeof e === "string" ? [e] : e,
                })
              }}
            >
              <Stack gap={8}>
                {
                  options.map((item, i) => {
                    return (
                      <CheckBoxEdit
                        key={i}
                        value={item}
                        isMultipleResult={isMultipleResult}
                        onChange={e => {
                          const newOptions = options.map((o, index) => index === i ? e : o);
                          setOptions(newOptions);
                        }}
                        onDelete={() => {
                          const updatedOptions = options.filter((_, index) => index !== i);
                          setOptions([...updatedOptions]);
                        }}
                      />
                    )
                  })
                }
              </Stack>
            </Component>
            <Button
              className={classes.btn_add_option}
              onClick={() => {
                setOptions([...options, ""]);
              }}
              leftSection={<IconPlus />}
            >Thêm đáp án</Button>
            <Group w={"100%"} justify="end">
              <Button color="red">Hủy</Button>
              <Button>Hoàn tất</Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Stack>
  )
}

export default QuizzVideo;