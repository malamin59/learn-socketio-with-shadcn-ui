import { MessageCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Icon Animation */}
      <div className="relative flex items-center justify-center">
        <MessageCircle className="w-16 h-16 text-blue-500 animate-bounce" />
        <div className="absolute w-20 h-20 border-4 border-blue-400 rounded-full animate-ping opacity-30"></div>
      </div>

      {/* Loading Text */}
      <h2 className="mt-6 text-2xl font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
        Connecting to Chat
        <span className="animate-pulse">...</span>
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Please wait while messages are loading
      </p>
    </div>
  );
}
