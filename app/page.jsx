"use client";

import UISingIn from "@/components/signin/UISingIn";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      toast.success("Login successful!");
      router.push("/overview");
    } else {
      const errMsg =
        res?.error || "An error occurred during login. Please try again.";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <UISingIn
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </>
  );
}
