"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import Or from "./Or";
import AuthButtons from "./AuthButtons";

export default function AuthFrom({ form, onsubmit, children, buttonLabel, authLink }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
        {/* ✅ Dynamic fields passed as children */}
        {children}
        {/* Submit Button */}
        <Button type="submit" className="w-full mt-2">
          {buttonLabel}
        </Button>
        <Or />
        <AuthButtons {...authLink}/>
      </form>
    </Form>
  );
}
