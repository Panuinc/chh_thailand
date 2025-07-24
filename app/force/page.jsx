"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import UIForcePasswordChange from "@/modules/auth/force/components/UIForcePasswordChange";

export default function ForcePasswordChange() {
  const { data: session } = useSession();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/auth/force", {
      method: "POST",
      body: JSON.stringify({
        newPassword,
        userId: session?.user?.id,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Password changed successfully!");
      router.push("/overview");
    } else {
      toast.error(data.message || "Something went wrong.");
    }
  };

  return (
    <UIForcePasswordChange
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      setNewPassword={setNewPassword}
      setConfirmPassword={setConfirmPassword}
      handleChangePassword={handleChangePassword}
    />
  );
}
