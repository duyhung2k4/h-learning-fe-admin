import { Button, Stack, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ScreenRecorder from "./Screen";


const LiveStream: React.FC = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Blob[]>([]);
  const [en, setEn] = useState<Blob[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleConnect = () => {
    if (!import.meta.env.VITE_BLOB_SERVICE) {
      console.log("connect error");
      return
    }
    const url = `${import.meta.env.VITE_BLOB_SERVICE}/api/v1/blob-stream/init-stream`
    const socket = new WebSocket(url);
    socket.onopen = () => {
      console.log("connected successfully!");

      setWs(socket);
    }
  }

  const sendMess = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      var blobData = new Blob(data.slice(0, 10));
      ws.send(blobData);
      setInput("");
    } else {
      console.error("WebSocket is not open");
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      var blobData = new Blob(data.slice(10, 20));
      ws.send(blobData);
      setInput("");
    } else {
      console.error("WebSocket is not open");
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      var blobData = new Blob(data.slice(20, 30));
      ws.send(blobData);
      setInput("");
    } else {
      console.error("WebSocket is not open");
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      var blobData = new Blob(data.slice(30, 40));
      ws.send(blobData);
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
      {!videoUrl && <ScreenRecorder setData={setData} />}
    </Stack>
  )
}

export default LiveStream;