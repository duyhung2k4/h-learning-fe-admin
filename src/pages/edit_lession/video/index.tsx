import React, { useEffect, useMemo, useState } from "react";

import { Button, FileButton, Group, Progress, Stack, Text, Tooltip } from "@mantine/core";
import { IconFolderUp, IconPlus, IconTrash } from "@tabler/icons-react";
import { useCheckVideoUploadMutation, useCreateVideoLessionMutation, useDetailVideoLessionQuery } from "@/redux/api/video_lession";
import { useParams } from "react-router";
import { useNotification } from "@/hook/notification.hook";

import classes from "./styles.module.css";
import textClasses from "@/styles/text.module.css";
import { useUploadVideoMutation } from "@/redux/api/upload_video";
import { UploadVideoMp4Req } from "@/dto/request/video_lession";
import { AxiosProgressEvent } from "axios";



const Video: React.FC = () => {
    const { id } = useParams();
    if (!id) return

    const noti = useNotification();

    const {
        data,
        refetch,
    } = useDetailVideoLessionQuery(Number(id));

    const [progress, setProgress] = useState<number>(0);
    const [video, setVideo] = useState<File | null>(null);

    const [post] = useCreateVideoLessionMutation();
    const [check, { isLoading: loadingCheck }] = useCheckVideoUploadMutation();
    const [upload, { isLoading: loadingProcess }] = useUploadVideoMutation();

    const videoLession = useMemo(() => {
        return data?.data;
    }, [data]);

    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        if (!progressEvent.total) return;
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
    }

    const handleCreateVideo = async () => {
        const lessionId = Number(id);
        if (lessionId === 0) {
            noti.error("Lấy thông tin bài học thất bại");
            return;
        }

        const result = await post({ lessionId });
        if ("error" in result) {
            noti.error("Khởi tạo video thất bại");
            return;
        }
    }

    const handleUploadVideo = async () => {
        if (!videoLession || !video) {
            noti.error("Lấy dữ liệu thất bại");
            return;
        }

        const resultCheck = await check({ videoLessionId: videoLession.ID });
        if("error" in resultCheck) {
            noti.error("Tải video thất bại");
            return;
        }

        const info: UploadVideoMp4Req = {
            metadata: {
                lessionId: videoLession.lessionId,
                uuid: videoLession.code,
            },
            video: video,
        }
        const result = await upload({ info, onUploadProgress });

        if ("error" in result) {
            noti.error("Tải video thất bại");
            return;
        }

        noti.success("Tải video thành công");
        setVideo(null);
        setProgress(0);
    }

    useEffect(() => {
        refetch();
    }, [id]);



    return (
        <Stack w={"100%"} p={16}>
            <Group w={"100%"} justify="space-between">
                <Group flex={1}>
                    {video &&
                        <Group>
                            <Text>
                                {video?.name}
                            </Text>
                            <Tooltip label="Loại bỏ">
                                <IconTrash
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setVideo(null)}
                                />
                            </Tooltip>
                        </Group>
                    }
                </Group>
                {video &&
                    <Button
                        onClick={handleUploadVideo}
                        loading={(loadingProcess || loadingCheck)}
                    >Xác nhận</Button>
                }
                {!video &&
                    <FileButton onChange={setVideo} accept="video/mp4">
                        {(props) =>
                            <Button
                                {...props}
                                leftSection={<IconFolderUp />}
                            >Tải video lên</Button>
                        }
                    </FileButton>
                }
            </Group>
            {(loadingProcess || loadingCheck) &&
                <Group w={"100%"}>
                    <Text fw={600} c={"#FFF"}>Tiến trình: </Text>
                    <Progress flex={1} value={progress} />
                </Group>}
            {!videoLession &&
                <Group
                    className={classes.add_chapter}
                    onClick={handleCreateVideo}
                >
                    <IconPlus size={30} />
                    <Text
                        className={textClasses.text_size_md}
                    >Khởi tạo video</Text>
                </Group>
            }
        </Stack>
    )
}

export default Video;