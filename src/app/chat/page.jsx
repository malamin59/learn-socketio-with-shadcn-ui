"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
      sender: "me",
    });
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-lg p-4 shadow">
      <h2 className="text-2xl font-bold text-center mb-4">💬 Live Chat</h2>
      {/* Message list  */}

      <div className="h-64 overflow-y-auto border rounded p-2 bg-gray-50 flex flex-col space-y-1">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`p-2 rounded-lg shadow-sm max-w-[70%] break-words whitespace-pre-wrap ${
                msg.sender === "me"
                  ? "bg-black text-white rounded-br-none"
                  : "bg-blue-950 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
              <span className="pl-2 text-xs text-gray-300">{msg.time}</span>
            </p>
          </div>
        ))}
      </div>

      {/* ইনপুট ও বাটন */}
      <div className="flex mt-2 items-start space-x-2">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1  min-h-[36px] max-h-32 resize-none"
        />
        <Button onClick={sendMessage}> send </Button>
      </div>
    </div>
  );
}
