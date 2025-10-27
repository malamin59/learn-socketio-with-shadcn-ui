"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AuthButtons({
  linkText = "Register",
  linkHref = "/register",
  linkPrefix = "New to this site? ",
}) {
  const handleGoogleLogin = () => signIn("google");
  const handleGithubLogin = () => signIn("github");

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      {/* Google */}
      <Button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white"
      >
        <FaGoogle /> Login with Google
      </Button>

      {/* GitHub */}
      <Button
        onClick={handleGithubLogin}
        className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white"
      >
        <FaGithub /> Login with GitHub
      </Button>

      {/* Dynamic Link */}
      <span className="text-center text-sm">
        {linkPrefix}
        <Link className="text-blue-700 hover:underline" href={linkHref}>
          {linkText}
        </Link>
      </span>
    </div>
  );
}
