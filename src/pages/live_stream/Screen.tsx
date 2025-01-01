import React, { useState, useRef, useEffect } from 'react';

export type ScreenRecorderProps = {
  ws: WebSocket
  setData: React.Dispatch<React.SetStateAction<Blob[]>>
}

const ScreenRecorder: React.FC<ScreenRecorderProps> = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [data, setData] = useState<Blob[]>([]); // State để lưu các chunk
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: { ideal: 60, max: 60 },
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
        },
        audio: true,
      });

      const options = { 
        mimeType: 'video/webm; codecs=vp8,opus',
        videoBitsPerSecond: 5000000,
        audioBitsPerSecond: 128000,
      };
      mediaRecorder.current = new MediaRecorder(stream, options);

      // Lấy từng chunk dữ liệu ngay lập tức
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Lưu chunk vào state
          setData((prevData) => [...prevData, event.data]);

          // Gửi dữ liệu cho parent component
          props.setData((prevData) => [...prevData, event.data]);

          props.ws.send(event.data)  // In chunk ra console để kiểm tra
        }
      };

      // Bắt đầu ghi video và âm thanh mỗi 100ms
      mediaRecorder.current.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error('Lỗi khi bắt đầu ghi màn hình:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    // Khi dừng ghi, tạo video từ các chunk đã ghi
    if (!isRecording) {
      console.log("Đã ghi xong:", data.slice(0, 10));  // In ra một số chunk đầu tiên để kiểm tra

      // Kết hợp các chunk thành một Blob mới
      const blob = new Blob(data, { type: 'video/webm;codecs=vp8,opus' });

      // Tạo URL để xem video
      setVideoUrl(URL.createObjectURL(blob));
    }
  }, [isRecording, data]);  // Khi isRecording hoặc data thay đổi

  return (
    <div style={{ width: "100%" }}>
      <h1>Screen Recorder</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Dừng ghi' : 'Bắt đầu ghi'}
      </button>
      {/* <div style={{ width: "100%" }}>
        <h3>Video đã ghi:</h3>
        <video
          controls
          style={{ 
            width: '100%',
            height: 'auto',
            objectFit: "cover",
          }}
          src={videoUrl || ""}
          autoPlay
        />
        <a href={videoUrl || ""} download="screen-recording.webm">
          Tải video
        </a>
      </div> */}

      {/* Hiển thị số lượng chunk trong thời gian thực */}
      <div>
        <h4>Số lượng chunk đã ghi: {data.length}</h4>
      </div>
    </div>
  );
};

export default ScreenRecorder;
