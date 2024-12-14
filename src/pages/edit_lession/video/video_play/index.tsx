import React, { useEffect, useMemo, useRef } from 'react';
import Hls from 'hls.js';
import { VideoLessionModel } from '@/model/video_lession';

interface VideoPlayerProps {
  videoLession: VideoLessionModel
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoSrc = useMemo(() => {
    const uuid = props.videoLession.code;
    const quantity = "360p";
    const filename = `${uuid}_${quantity}.m3u8`;
    return `${import.meta.env.VITE_UPLOAD_VIDEO_HLS}/api/v1/video/${uuid}/${quantity}/${filename}`;
  }, [props.videoLession]);

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

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: '100%', maxWidth: '720px' }}
    />
  );
};

export default VideoPlayer;
