"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://chat-rho-amber.vercel.app");

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { data: session, status } = useSession();
  const messagesEndRef = useRef(null);
  const { name, email, image } = session?.user || {};
  console.log(messages);
  //explain below useEffect how it work ??
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("new message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  /* scroll to bottom  */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
  if (!session)
    return (
      <div className="flex gap-2 items-center justify-center h-screen text-xl">
        Please login to chat{" "}
        <Link className="text-blue-700 hover:underline" href="/login">
          {" "}
          login
        </Link>
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-22 border rounded-lg p-4 shadow">
      <h2 className="text-2xl font-bold text-center mb-4">💬 Live Chat</h2>
      {/* Message list  */}
      <div className="h-84 overflow-y-auto border rounded p-2 bg-gray-50 flex flex-col space-y-1">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.email === email ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`p-2 rounded-lg shadow-sm max-w-[75%]  w-fit break-words whitespace-pre-wrap ${
                msg.email === email
                  ? "bg-black text-white rounded-br-none"
                  : "bg-blue-950 text-gray-800 rounded-bl-none"
              }`}
            >
              <span className="text-sm"> {msg?.name}</span>
              <br />
              {msg.text} <br />
              <span className="pl-2 flex justify-end text-xs text-gray-300">
                {msg.time}
              </span>
            </p>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* input & button */}
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
