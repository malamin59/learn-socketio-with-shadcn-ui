"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import BackLogin from "../shard/BackLogin";
import ChatHeader from "./Components/ChatHeader";
import MessageList from "./Components/MessageList";
import MessageInput from "./Components/MessageInput";
const socket = io("https://socketio-server-kjv0.onrender.com");

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { data: session, status } = useSession();
  const { name, email, image } = session?.user || {};

  //explain below useEffect how it work ??
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("new message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    // send the current time
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    // send message the to server
    socket.emit("sendMessage", {
      text: message,
      time: currentTime,
      name: name,
      email: email,
      image: image,
    });
    setMessage("");
  };
  // if (!session) return <BackLogin />;
  return (
    <div className="max-w-md mx-auto h-screen    border min-h-[100dvh] rounded-lg p-4  shadow">
      <ChatHeader />
      {/* Message list  */}
      <MessageList messages={messages} userEmail={email} />
      {/* input & button */}
      <MessageInput
        messages={messages}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
