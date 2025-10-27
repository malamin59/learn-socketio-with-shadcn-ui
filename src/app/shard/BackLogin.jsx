import Link from "next/link";
import React from "react";

export default function BackLogin() {
  return (
    <div className="flex gap-2 items-center justify-center h-screen text-xl">
      <div>
        <p>
          {" "}
          Please{" "}
          <Link className="text-blue-700 hover:underline" href="/login">
            {" "}
            login
          </Link>{" "}
          to chat{" "}
        </p>
      </div>
    </div>
  );
}
