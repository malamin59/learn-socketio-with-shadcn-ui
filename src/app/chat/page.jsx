"use client";
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
    // 📤 সার্ভারে মেসেজ পাঠানো
    socket.emit("sendMessage", message);
  };
  //   if(messages.length === 0) return <p> no message fount</p>
  return (
    <div className="max-w-md mx-auto mt-10 border rounded-lg p-4 shadow">
      <h2 className="text-2xl font-bold text-center mb-4">💬 Live Chat</h2>

      {/* মেসেজ লিস্ট */}
      <div className="h-64 overflow-y-auto border rounded p-2 bg-gray-50">
        {messages &&
          messages.map((msg, index) => (
            <p
              key={index}
              className="bg-white p-2 rounded shadow-sm mb-1 text-gray-800"
            >
              {msg}
            </p>
          ))}
      </div>

      {/* ইনপুট ও বাটন */}
      <div className="flex mt-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          type="submit"
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 cursor-pointer rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
