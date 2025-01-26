import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Hls from 'hls.js';

import { VideoLessionModel } from '@/model/video_lession';
import { Box, Group, Slider, Stack } from '@mantine/core';
import { IconMaximize, IconMaximizeOff, IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import { EditLessionVideoContext, EditLessionVideoContextType } from '..';

import iconClass from "@/styles/icon.module.css";


interface VideoPlayerProps {
  videoLession: VideoLessionModel;
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const boxVideoRef = useRef<HTMLDivElement | null>(null);

  const { 
    duration, 
    setDuration,
  } = useContext<EditLessionVideoContextType>(EditLessionVideoContext);

  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<number | null>(null);

  const videoSrc = useMemo(() => {
    const uuid = props.videoLession.code;
    const quantity = '360p';
    const filename = `${uuid}_${quantity}.m3u8`;
    return `${import.meta.env.VITE_UPLOAD_VIDEO_HLS}/api/v1/video/${uuid}/${quantity}/${filename}`;
  }, [props.videoLession]);

  useEffect(() => {
    const video = videoRef.current;

    if (video && !isDragging) {
      const updateProgress = () => {
        if (video.duration > 0) {
          setCurrentTime(video.currentTime);
          setDuration(video.duration);
          setProgress((video.currentTime / video.duration) * 100);
        }
      };

      video.addEventListener('timeupdate', updateProgress);

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [isDragging]);

  useEffect(() => {
    const boxVideo = boxVideoRef.current;

    const checkFullscreen = () => {
      if (boxVideo) {
        if (document.fullscreenElement === boxVideo) {
          setIsFullscreen(true);
        } else {
          setIsFullscreen(false);
        }
      }
    };

    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    document.addEventListener('mozfullscreenchange', checkFullscreen);
    document.addEventListener('msfullscreenchange', checkFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
      document.removeEventListener('webkitfullscreenchange', checkFullscreen);
      document.removeEventListener('mozfullscreenchange', checkFullscreen);
      document.removeEventListener('msfullscreenchange', checkFullscreen);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [videoSrc]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayVideo = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handleSliderChange = (value: number) => {
    setProgress(value); // Cập nhật khi kéo
  };

  const handleSliderChangeEnd = (value: number) => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      video.currentTime = (value / 100) * video.duration; // Cập nhật thời gian phát
    }
    setIsDragging(false); // Thoát trạng thái kéo
  };

  const toggleFullscreen = () => {
    const boxVideo = boxVideoRef.current;
    if (boxVideo) {
      if (!isFullscreen) {
        if (boxVideo.requestFullscreen) {
          boxVideo.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  return (
    <Stack w={'100%'} align="center">
      <Box
        ref={boxVideoRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 8,
        }}
      >

        <video
          ref={videoRef}
          controls={false}
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'block',
            width: '100%',
            cursor: 'pointer',
          }}
          onClick={handlePlayVideo}
        />



        <Stack
          style={{
            position: 'absolute',
            display: isHovered || videoRef.current?.paused ? undefined : "none",
            bottom: 0,
            width: '100%',
            alignItems: 'center',
            zIndex: 2,
            padding: '16px 0px',
            background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
          }}
        >
          <Stack w={'95%'} gap={4}>
            <Slider
              value={progress}
              onChange={handleSliderChange}
              onChangeEnd={handleSliderChangeEnd}
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

            <Group justify="space-between">
              <Group justify="start">
                {videoRef.current?.paused ? (
                  <IconPlayerPlayFilled className={iconClass.icon} onClick={handlePlayVideo} />
                ) : (
                  <IconPlayerPauseFilled className={iconClass.icon} onClick={handlePlayVideo} />
                )}
                <span style={{ color: 'white', fontSize: '14px', marginLeft: '8px' }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </Group>
              <Group justify="end">
                {isFullscreen ? (
                  <IconMaximizeOff className={iconClass.icon} onClick={toggleFullscreen} />
                ) : (
                  <IconMaximize className={iconClass.icon} onClick={toggleFullscreen} />
                )}
              </Group>
            </Group>
          </Stack>


          {hoveredValue !== null && tooltipPosition !== null && (
            <Box
              style={{
                position: 'absolute',
                top: -30,
                left: tooltipPosition,
                backgroundColor: 'black',
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



      </Box>
    </Stack>
  );
};

export default VideoPlayer;
