import React, { useEffect, useMemo } from "react";
import EditQuizz from "./edit";

import {
  Stack,
} from "@mantine/core";
import { useParams } from "react-router";
import { useGetQuizzByEntityIdQuery } from "@/redux/api/quizz";




const QuizzVideo: React.FC = () => {
  const { id } = useParams();
  const courseId = useMemo(() => {
    return Number(id || 0);
  }, [id]);
  if (courseId === 0) {
    return (<></>)
  }

  const {
    data: dataQuizzByEntityIdRes,
    refetch: refetchQuizzByEntityId,
  } = useGetQuizzByEntityIdQuery(courseId);

  const quizzs = useMemo(() => {
    return dataQuizzByEntityIdRes?.data || [];
  }, [dataQuizzByEntityIdRes]);



  useEffect(() => {
    refetchQuizzByEntityId();
  }, [courseId]);



  return (
    <Stack p={16}>
      <EditQuizz />
      {
        quizzs.map(item => <EditQuizz key={item.ID} quizz={item} />)
      }
    </Stack>
  )
}

export default QuizzVideo;