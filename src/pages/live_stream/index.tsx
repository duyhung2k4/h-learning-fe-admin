import React, { useEffect, useState } from "react";
import ScreenRecorder from "./Screen";

import { Button, Stack, TextInput } from "@mantine/core";


const LiveStream: React.FC = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Blob[]>([]);
  const [en, setEn] = useState<Blob[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);

  const handleConnect = () => {
    if (!import.meta.env.VITE_BLOB_SERVICE) {
      console.log("connect error");
      return
    }
    const url = `${import.meta.env.VITE_BLOB_SERVICE}/api/v1/blob-stream/init-stream-test?uuid=cee7c1c6-c763-11ef-a0d0-00155d277af3&quantity_360p=localhost:9008`
    const socket = new WebSocket(url);
    socket.onopen = () => {
      console.log("connected successfully!");

      setWs(socket);
    }
  }

  const sendMess = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      // var blobData = new Blob(data.slice(0, 10));
      // data.forEach(d => {
      //   ws.send(d);
      // })
      ws.send(data[index]);
      setIndex(index + 1);
      setInput("");
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

    ws.onmessage = (event) => {
      const data = event.data as Blob;
      setEn(prev => [...prev, data]);
      console.log("Received message:", event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, [ws]);



  return (
    <Stack>
      {!ws && <Button onClick={handleConnect}>Connect</Button>}
      {ws &&
        <>
          <TextInput
            value={input}
            onChange={e => setInput(e.target.value)}
          />
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