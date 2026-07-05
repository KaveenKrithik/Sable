import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useMetricsSocket(url: string = "http://localhost:3001") {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to metrics socket");
      newSocket.emit("subscribe_metrics", {});
    });

    newSocket.on("job_update", (data) => {
      console.log("Job Update:", data);
      setMetrics((prev) => [...prev, data]);
    });

    newSocket.on("worker_status", (data) => {
      console.log("Worker Status:", data);
    });

    return () => {
      newSocket.close();
    };
  }, [url]);

  return { socket, metrics };
}
