import React, { useEffect, useMemo } from "react";
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
import { useCreateQuizzMutation, useUpdateQuizzMutation } from "@/redux/api/quizz";
import { useParams } from "react-router";

import classes from "./style.module.css";
import textClasses from "@/styles/text.module.css";
import { QuizzModel } from "@/model/quizz";



type FormEditQuizz = {
  ask: string
  options: string[]
  results: string[]
  isMultipleResult: boolean
}



export type EditQuizzProps = {
  quizz?: QuizzModel
}

const EditQuizz: React.FC<EditQuizzProps> = (props) => {
  const { id } = useParams();
  const courseId = useMemo(() => {
    return Number(id || 0);
  }, [id]);
  if (courseId === 0) {
    return (<></>)
  }

  const [createQuizz, { isLoading: loadingCreate }] = useCreateQuizzMutation();
  const [updateQuizz, { isLoading: loadingQuizz }] = useUpdateQuizzMutation();



  const loading = useMemo(() => {
    return (
      loadingCreate ||
      loadingQuizz
    );
  }, [
    loadingCreate,
    loadingQuizz,
  ]);



  const formEditQuizz = useForm<FormEditQuizz>({
    initialValues: {
      ask: props.quizz?.ask || "",
      results: props.quizz?.result || [],
      options: props.quizz?.option || ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
      isMultipleResult: props.quizz?.resultType ? (props.quizz.resultType === "QUIZZ_MULTI_RESULT" ? true : false) : false,
    },
  });

  const handleSubmit = async (values: FormEditQuizz) => {
    values.results = values.results.filter(result => values.options.includes(result))
    if (!props.quizz) {
      handleCreate(values);
    } else {
      handleUpdate(values);
    }
  }

  const handleCreate = async (values: FormEditQuizz) => {
    try {
      const result = await createQuizz({
        ask: values.ask,
        resultType: values.isMultipleResult ? "QUIZZ_MULTI_RESULT" : "QUIZZ_SINGLE_RESULT",
        result: values.results,
        option: values.options,
        time: 0,
        entityType: "QUIZZ_LESSION",
        entityId: courseId,
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (values: FormEditQuizz) => {
    try {
      if (!props.quizz) {
        throw "Dữ liệu trống";
      }

      const result = await updateQuizz({
        id: props.quizz.ID,
        ask: values.ask,
        resultType: values.isMultipleResult ? "QUIZZ_MULTI_RESULT" : "QUIZZ_SINGLE_RESULT",
        result: values.results,
        option: values.options,
        time: 0,
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }


  const Component = formEditQuizz.values.isMultipleResult ? Checkbox.Group : Radio.Group;

  useEffect(() => {
    if (!formEditQuizz.values.isMultipleResult && formEditQuizz.values.results.length > 1) {
      formEditQuizz.setValues({
        ...formEditQuizz.values,
        results: [formEditQuizz.values.results[0]]
      })
    }
  }, [formEditQuizz.values.isMultipleResult, formEditQuizz.values.options]);



  return (
    <Stack
      p={16}
      className={classes.quizz_setting}
    >
      <form id={`edit-quizz-${props.quizz?.ID || 0}`} onSubmit={formEditQuizz.onSubmit(handleSubmit)}>
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
            {...formEditQuizz.getInputProps("ask")}
          />
          <Group>
            <Text className={textClasses.text_size_xs}>Nhiều đáp án</Text>
            <Switch
              onChange={e => {
                formEditQuizz.setFieldValue("isMultipleResult", e.currentTarget.checked);
              }}
            />
          </Group>
          <Component
            value={
              formEditQuizz.values.isMultipleResult
                ? formEditQuizz.values.results as any
                : (formEditQuizz.values.results.length > 0 ? formEditQuizz.values.results[0] as any : undefined)
            }
            onChange={e => {
              formEditQuizz.setValues({
                ...formEditQuizz.values,
                results: typeof e === "string" ? [e] : e,
              })
            }}
          >
            <Stack gap={8}>
              {
                formEditQuizz.values.options.map((item, i) => {
                  return (
                    <CheckBoxEdit
                      key={i}
                      value={item}
                      isMultipleResult={formEditQuizz.values.isMultipleResult}
                      onChange={e => {
                        const newOptions = formEditQuizz.values.options.map((o, index) => index === i ? e : o);
                        formEditQuizz.setFieldValue("options", newOptions);
                      }}
                      onDelete={() => {
                        const updatedOptions = formEditQuizz.values.options.filter((_, index) => index !== i);
                        formEditQuizz.setFieldValue("options", updatedOptions);
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
              formEditQuizz.setFieldValue("options", [...formEditQuizz.values.options, ""]);
            }}
            leftSection={<IconPlus />}
          >Thêm đáp án</Button>
          <Group w={"100%"} justify="end">
            <Button color="red">Hủy</Button>
            <Button
              type="submit"
              form={`edit-quizz-${props.quizz?.ID || 0}`}
              loading={loading}
            >Hoàn tất</Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  )
}

export default EditQuizz;