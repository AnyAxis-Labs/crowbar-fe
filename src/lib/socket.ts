import { createContext } from "react";
import { io } from "socket.io-client";

export enum StreamingEventName {
  SubscribeGlobalTrading = "SubscribeGlobalTrading",
  UnSubscribeGlobalTrading = "UnSubscribeGlobalTrading",
  SubscribeLastTrading = "SubscribeLastTrading",
  UnSubscribeLastTrading = "UnSubscribeLastTrading",
  SubscribeChart = "SubscribeChart",
  UnSubscribeChart = "UnSubscribeChart",
  SubscribeComment = "SubscribeComment",
  UnSubscribeComment = "UnSubscribeComment",
  SubscribeNewMeme = "SubscribeNewMeme",
  UnSubscribeNewMeme = "UnSubscribeNewMeme",
}

export const socket = io("/socket.io/", {
  transports: ["websocket"],
});
export const channelToSubscription = new Map();
export const SocketContext = createContext<typeof socket>(socket);

socket.on("connect", () => {
  if (process.env.ENV_PHASE === "local") {
    console.log("[socket] Connected");
  }
});

socket.on("disconnect", (reason) => {
  if (process.env.ENV_PHASE === "local") {
    console.log("[socket] Disconnected:", reason);
  }
});

socket.on("error", (error) => {
  console.log("[socket] Error:", error);
});

export const subscribeToChannel = (
  channel: StreamingEventName,
  ...args: unknown[]
) => {
  console.log("[socket] Subscribing to streaming channel:", channel, ...args);
  socket.emit(channel, ...args);
};

export const onStreamingMessage = (
  channel: StreamingEventName,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  callback: (data: any) => void
) => {
  socket.on(channel, (data) => {
    console.log("[socket] New streaming message to:", channel, data);
    callback(data);
  });
};

export const unsubscribeToChannel = (
  channel: StreamingEventName,
  ...args: unknown[]
) => {
  console.log("[socket] Unsubscribe channel:", channel);
  socket.emit(channel, args);
};
