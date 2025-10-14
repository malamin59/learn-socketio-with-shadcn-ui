"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function AuthButtons() {
  const handleGoogleLogin = () => {
    signIn("google");
    };

  const handleGithubLogin = () => {
    signIn("github");
    console.log("github login clicked");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      <Button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white"
      >
        <FaGoogle /> Login with Google
      </Button>

      <Button
        onClick={handleGithubLogin}
        className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white"
      >
        <FaGithub /> Login with GitHub
      </Button>
    </div>
  );
}
