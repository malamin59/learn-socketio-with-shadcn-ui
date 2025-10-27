"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/auth/register";
import InputField from "./InputField";
import AuthFrom from "@/app/Components/Common/AuthFrom";
// ✅ Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      photoUrl: "",
    },
  });

  const onSubmit = async (data) => {
    try {
    registerUser(data);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        alert("something went wrong!");
      }
    }
  };
  const photoUrl = form.watch("photoUrl");

  return (
    <AuthFrom
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Login"
      authLink={{
        linkText: "Login",
        linkHref: "/login",
        linkPrefix: "Already have an account? ",
      }}
    >
      <InputField form={form} />
    </AuthFrom>
  );
}
