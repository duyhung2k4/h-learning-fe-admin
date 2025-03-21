import React, { useEffect, useMemo, useState } from "react";
import HeaderPage from "@/components/header_page";

import { Button, Grid, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";
import { useGetAllCourseQuery } from "@/redux/api/course";

import textStyles from "@/styles/text.module.css";
import CardCourse from "./card";



const ManagerCourse: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const navigation = useNavigate();

  const {
    data: courseData,
    refetch,
  } = useGetAllCourseQuery(null);

  const handleCreateCourse = () => {
    navigation(ROUTER.CREATE_COURSE.href);
  }

  const courses = courseData?.data || [];
  const courseFilter = useMemo(() => {
    if(search === "") return courses;

    return courses.filter(item => item.name.includes(search));
  }, [courses, search]);

  useEffect(() => {
    refetch();
  }, []);

  console.log(courses);



  return (
    <Stack w={"100%"} h={"100%"} gap={0}>
      <HeaderPage
        style={{
          backgroundColor: "#151517",
          borderBottom: "2px solid #969696",
        }}
      >
        <Stack w={"100%"} align="center">
          <Group w={"100%"} justify="space-between">
            <Text className={textStyles.title_page}>Quản lí khóa học</Text>
            <Button
              leftSection={<IconPlus />}
              onClick={handleCreateCourse}
            >Tạo mới</Button>
          </Group>
        </Stack>
      </HeaderPage>
      <HeaderPage>
        <Group w={"100%"}>
          <Group w={"100%"}>
            <TextInput
              flex={1}
              placeholder="Tìm theo tên khóa học"
              leftSection={<IconSearch />}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Group>
        </Group>
      </HeaderPage>

      <Stack
        style={{
          padding: 16,
          flex: 1,
          overflowY: "scroll"
        }}
      >
        <Grid>
          {
            courseFilter.map(c =>
              <Grid.Col span={{ xs: 6, md: 4, lg: 3 }} key={c.ID}>
                <CardCourse {...c} />
              </Grid.Col>
            )
          }
        </Grid>
      </Stack>
    </Stack>
  )
}

export default ManagerCourse;