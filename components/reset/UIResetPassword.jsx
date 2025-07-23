"use client";

import React from "react";
import Image from "next/image";
import { Input, Button } from "@heroui/react";

export default function UIResetPassword({
  password,
  confirm,
  setPassword,
  setConfirm,
  handleSubmit,
}) {
  return (
    <div className="flex flex-row items-center justify-center w-full lg:w-6/12 p-2 gap-2 border-1 shadow-lg rounded-3xl">
      <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Image
            src="/logo/logo.png"
            alt="logo"
            width={200}
            height={200}
            priority
          />
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 text-lg font-semibold">
          Reset Password
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Input
            name="password"
            type="password"
            label="New Password"
            labelPlacement="outside"
            placeholder="Enter new password"
            variant="bordered"
            color="default"
            radius="full"
            isRequired
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Input
            name="confirm"
            type="password"
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Re-enter password"
            variant="bordered"
            color="default"
            radius="full"
            isRequired
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Button
            onPress={handleSubmit}
            type="submit"
            color="primary"
            radius="full"
            className="w-9/12 h-full p-3 gap-2"
          >
            Reset Password
          </Button>
        </div>
      </div>
      <div className="lg:flex hidden flex-col items-center justify-center w-full h-full p-2 gap-2">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Image
            src="/picture/picture.png"
            alt="picture"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  );
}
