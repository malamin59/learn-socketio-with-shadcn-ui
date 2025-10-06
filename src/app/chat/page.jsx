"use client";
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
      console.log("নতুন মেসেজ এসেছে:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage"); // hwy call of ?
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    // send the current time
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    // 📤 সার্ভারে মেসেজ পাঠানো
    socket.emit("sendMessage", {
      text: message,
      time: currentTime,
      sender:"me"
    });
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-lg p-4 shadow">
      <h2 className="text-2xl font-bold text-center mb-4">💬 Live Chat</h2>

      {/* মেসেজ লিস্ট */}
      <div className="h-64 overflow-y-auto  border rounded p-2 bg-gray-50">
        {messages &&
          messages.map((msg, index) => (
            <p
              key={index}
              className="bg-white p-2 rounded shadow-sm mb-1 break-words whitespace-pre-wrap text-gray-800"
            >
              {msg?.text}
              <span className=" pl-2 text-gray-500">{msg?.time}</span>
            </p>
          ))}
      </div>

      {/* ইনপুট ও বাটন */}
      <div className="flex mt-2 items-start space-x-2">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1  min-h-[45px] max-h-32 resize-none"
        />
        <button
          type="submit"
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
