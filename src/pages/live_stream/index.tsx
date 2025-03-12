import React, { useEffect, useState } from "react";
import ScreenRecorder from "./Screen";

import { Button, Stack, TextInput } from "@mantine/core";



const LiveStream: React.FC = () => {
  const [data, setData] = useState<Blob[]>([]);
  const [en, _] = useState<Blob[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  // const [wsEn, setWsEn] = useState<WebSocket | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [uuid, setUuid] = useState<string>("");

  const handleConnect = () => {
    if (!import.meta.env.VITE_BLOB_SERVICE) {
      console.log("connect error");
      return
    }
    const url = `${import.meta.env.VITE_BLOB_SERVICE}/api/v1/blob-stream/stream-encoding?uuid=${uuid}`
    const socket = new WebSocket(url);
    socket.onopen = () => {
      console.log("connected successfully!");
      setWs(socket);
    }
  }

  const sendMess = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(data[index]);
      setIndex(index + 1);
    } else {
      console.error("WebSocket is not open");
    }
  }

  const play = () => {
    const mergedBlob = new Blob(en, { type: "video/webm" });
    setVideoUrl(URL.createObjectURL(mergedBlob));
  }

  useEffect(() => {
    if (!ws) {
      console.log("ws not found");
      return;
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, [ws]);



  return (
    <Stack style={{ overflow: "scroll", width: "100%" }}>
      <TextInput
        value={uuid}
        onChange={e => setUuid(e.target.value)}
      />
      {!ws && <Button onClick={handleConnect}>Connect</Button>}
      {ws &&
        <>
          <Button onClick={sendMess}>Send</Button>
          <Button onClick={play}>Play</Button>
        </>
      }
      {/* Hiển thị video đã tạo */}
      <div>
        <h3>Video đã nhận:</h3>
        {videoUrl && (
          <>
            <video
              controls
              style={{ width: '100%', maxHeight: '500px' }}
              src={videoUrl || ""}
              autoPlay
            />
            <a href={videoUrl} download="combined-video.webm">
              Tải video
            </a>
          </>
        )}
      </div>
      {(!videoUrl && ws) &&
        <ScreenRecorder
          ws={ws}
          setData={setData}
        />
      }
    </Stack>
  )
}

export default LiveStream;