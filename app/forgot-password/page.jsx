"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import UIForgotPassword from "@/components/forgot/UIForgotPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSendResetLink = async () => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Check your email for the reset link.");
    } else {
      toast.error(data.message || "Something went wrong.");
    }
  };

  return (
    <UIForgotPassword
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSendResetLink}
    />
  );
}
