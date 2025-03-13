import React, { createContext, useEffect, useMemo, useState } from "react";
import UploadVideo from "./upload_video";
import VideoPlayer from "./video_play";

import { Stack } from "@mantine/core";
import { useDetailVideoLessionQuery } from "@/redux/api/video_lession";
import { useParams } from "react-router";




const Video: React.FC = () => {
  const { id } = useParams();
  if (!id) return

  const [duration, setDuration] = useState<number>(0);

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
    <EditLessionVideoContext.Provider
      value={{
        duration,
        setDuration,
      }}
    >
      <Stack w={"100%"} p={16} mb={60}>
        {(videoLession?.status === null || !videoLession) &&
          <UploadVideo
            id={id}
            videoLession={videoLession}
            refetch={refetch}
          />
        }
        {
          videoLession?.url360p &&
          <VideoPlayer
            videoLession={videoLession}
          />
        }
        {/* {
          videoLession?.url360p &&
          <QuizzVideo />
        } */}
      </Stack>
    </EditLessionVideoContext.Provider>
  )
}

export type EditLessionVideoContextType = {
  duration: number
  setDuration: (_: number) => void
};
export const EditLessionVideoContext = createContext<EditLessionVideoContextType>({
  duration: 0,
  setDuration: () => {},
});

export default Video;