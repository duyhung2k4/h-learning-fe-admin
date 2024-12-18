import React, { useEffect, useMemo } from "react";
import UploadVideo from "./upload_video";
import VideoPlayer from "./video_play";

import { Stack } from "@mantine/core";
import { useDetailVideoLessionQuery } from "@/redux/api/video_lession";
import { useParams } from "react-router";




const Video: React.FC = () => {
  const { id } = useParams();
  if (!id) return

  const {
    data,
    refetch,
  } = useDetailVideoLessionQuery(Number(id));

  const videoLession = useMemo(() => {
    return data?.data;
  }, [data]);

  useEffect(() => {
    refetch();
  }, [id]);



  return (
    <Stack w={"100%"} p={16}>
      <UploadVideo
        id={id}
        videoLession={videoLession}
        refetch={refetch}
      />
      {
        videoLession?.url1080p &&
        <VideoPlayer
          videoLession={videoLession}
        />
      }
    </Stack>
  )
}

export default Video;