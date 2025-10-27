"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import AuthFrom from "@/app/Components/Common/AuthFrom";
import InputField from "@/app/register/Components/InputField";
import LogInInputField from "./LogInInputField";

// ✅ Validation schema with Zod
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function FormLogin() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ Handle submit
  const onSubmit = (data) => {
    alert(`Email: ${data.email}\nPassword: ${data.password}`);
    // You can call your login API here instead of alert
  };

  return (
    <AuthFrom
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Login"
      authLink={{
        linkText: "register",
        linkHref: "/register",
        linkPrefix: "New this site please? ",
      }}
    >
      <LogInInputField form={form} />
    </AuthFrom>
  );
}
