import React, { useEffect, useState } from "react";
import ScreenRecorder from "./Screen";

import { Button, Stack, TextInput } from "@mantine/core";


const LiveStream: React.FC = () => {
  const [data, setData] = useState<Blob[]>([]);
  const [en, setEn] = useState<Blob[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [wsEn, setWsEn] = useState<WebSocket | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [uuid, setUuid] = useState<string>("");

  const handleConnect = () => {
    if (!import.meta.env.VITE_BLOB_SERVICE) {
      console.log("connect error");
      return
    }
    const url = `${import.meta.env.VITE_BLOB_SERVICE}/api/v1/blob-stream/init-stream?uuid=${uuid}&quantity_360p=localhost:9008&ip_merge_blob=localhost:9007`
    const socket = new WebSocket(url);
    socket.onopen = () => {
      console.log("connected successfully!");
      setWs(socket);
    }

    const urlEn = `${import.meta.env.VITE_BLOB_MERGE}/api/v1/stream/blob?uuid=${uuid}`
    const socketEn = new WebSocket(urlEn);
    socketEn.onopen = () => {
      console.log("connected successfully socket en!");
      setWsEn(socketEn);
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

    // ws.onmessage = (event) => {
    //   const data = event.data as Blob;
    //   setEn(prev => [...prev, data]);
    //   console.log("Received message:", event.data);
    // };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, [ws]);

  useEffect(() => {
    if (!wsEn) {
      console.log("ws not found");
      return;
    }

    wsEn.onerror = (error) => {
      console.error("WebSocket En error:", error);
    };

    wsEn.onclose = () => {
      console.log("WebSocket En connection closed");
    };

    // wsEn.onmessage = (event) => {
    //   const data = event.data as Blob;
    //   setEn(prev => [...prev, data]);
    //   console.log("Received message En:", event.data);
    // };

    wsEn.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const blob = event.data;
        console.log("Blob type:", blob.type);

        if (blob.type.startsWith("video/")) {
          console.log("This is a video file of type:", blob.type);
        } else {
          console.log("Not a video file");
        }
      } else {
        console.log("Data is not a Blob");
      }
    };
  }, [wsEn]);



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