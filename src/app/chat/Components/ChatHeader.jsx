"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function ChatHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2 pt-12 mb-4"
    >
      <MessageSquare className="w-6 h-6 text-blue-500" />
      <h2 className="text-2xl font-bold text-center">Live Chat</h2>
    </motion.div>
  );
}
