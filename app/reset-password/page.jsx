"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UIResetPassword from "@/components/reset/UIResetPassword";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleResetPassword = async () => {
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword: password }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Password reset successful!");
      router.push("/signin");
    } else {
      toast.error(data.message || "Something went wrong.");
    }
  };

  return (
    <UIResetPassword
      password={password}
      confirm={confirm}
      setPassword={setPassword}
      setConfirm={setConfirm}
      handleSubmit={handleResetPassword}
    />
  );
}
