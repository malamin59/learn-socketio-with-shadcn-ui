"use client"
import { useEffect, useRef } from "react";

export default function MessageList({ messages, userEmail }) {
  const messagesEndRef = useRef(null);
  /* scroll to bottom  */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="h-9/12 overflow-y-auto border  rounded p-2 bg- flex flex-col space-y-1">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.email === userEmail ? "justify-end" : "justify-start"
          }`}
        >
          <p
            className={`p-1 rounded-lg shadow-sm max-w-[75%]  w-fit break-words whitespace-pre-wrap ${
              msg.email === userEmail
                ? "bg-green-800 text-white rounded-br-none"
                : "bg-gray-800 text-white rounded-bl-none"
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
  );
}
