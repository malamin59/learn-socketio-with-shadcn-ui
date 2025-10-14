"use client";

import { motion } from "framer-motion";
import { MessageCircleOff } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-center px-4">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageCircleOff className="w-24 h-24 text-blue-500" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="mt-6 text-3xl font-bold text-blue-600 dark:text-blue-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        404 — Page Not Found
      </motion.h1>

      {/* Description */}
      <motion.p
        className="mt-2 text-gray-600 dark:text-gray-300 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Looks like the conversation you're looking for doesn't exist .  
        Maybe it was deleted or the link is broken.
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
