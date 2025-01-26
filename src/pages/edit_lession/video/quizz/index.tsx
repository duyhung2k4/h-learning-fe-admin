import React, { useContext, useEffect, useState } from "react";
import CheckBoxEdit from "./checkBox";

import {
  Box,
  Button,
  Checkbox,
  Group,
  Radio,
  Slider,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { EditLessionVideoContext, EditLessionVideoContextType } from "..";

import classes from "./style.module.css";
import textClasses from "@/styles/text.module.css";
import { useForm } from "@mantine/form";

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

  const [progress, setProgress] = useState<number>(0);
  const [tooltipPosition, setTooltipPosition] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const {
    duration,
  } = useContext<EditLessionVideoContextType>(EditLessionVideoContext);



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

  const handleSliderChange = (value: number) => {
    setProgress(value); // Cập nhật khi kéo
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if(!isMultipleResult && formCreateQuizz.values.results.length > 1) {
      formCreateQuizz.setValues({
        ...formCreateQuizz.values,
        results: [formCreateQuizz.values.results[0]]
      })
    }
    setOptions(options);
  }, [isMultipleResult]);



  return (
    <Stack>
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
            <Stack
              pos={"relative"}
              align="start"
              w={"100%"}
              gap={2}
            >
              <Text className={textClasses.text_size_xs}>Thời điểm xuất hiện</Text>
              <Slider
                w={"100%"}
                value={progress}
                onChange={handleSliderChange}
                min={0}
                max={100}
                label={null}
                onMouseMove={(event) => {
                  const sliderRect = event.currentTarget.getBoundingClientRect();
                  const x = event.clientX - sliderRect.left;
                  const percentage = Math.min(100, Math.max(0, (x / sliderRect.width) * 100));

                  setHoveredValue(percentage);
                  setTooltipPosition(x);
                }}
                onMouseLeave={() => {
                  setHoveredValue(null);
                  setTooltipPosition(null);
                }}
                styles={{
                  track: { height: 6 },
                  thumb: { display: 'block', width: 10, height: 10 },
                }}
              />

              {hoveredValue !== null && tooltipPosition !== null && (
                <Box
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: tooltipPosition,
                    backgroundColor: "#6E54B5",
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {formatTime((hoveredValue / 100) * duration)}
                </Box>
              )}
            </Stack>
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
                        defaultValue={item}
                        isMultipleResult={isMultipleResult}
                        onChange={e => {
                          const newOptions = options.map((o, index) => index === i ? e : o);
                          setOptions(newOptions);
                        }}
                      />
                    )
                  })
                }
              </Stack>
            </Component>
            <Button
              mt={20}
              onClick={() => {
                setOptions([...options, ""]);
              }}
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