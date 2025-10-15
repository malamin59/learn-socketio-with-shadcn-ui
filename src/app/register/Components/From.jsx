"use client";
import React, { useState } from "react";
import Or from "./or";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthButtons from "./social";
import { registerUser } from "@/app/actions/auth/registerUser";

export default function From() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value
    const email = from.email.value
    const password = from.password.value
    // alert(`Email: ${email}\nPassword: ${password}`);
    const payload = {
      name, email, password
    }
   registerUser(payload)

  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Name</Label>
          <Input
            id="name"
            type="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <Button type="submit" className="w-full mt-2">
          Login
        </Button>
        <Or />
        <AuthButtons />
      </form>
    </div>
  );
}
