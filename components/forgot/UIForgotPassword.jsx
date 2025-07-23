"use client";

import React from "react";
import Image from "next/image";
import { Input, Button } from "@heroui/react";

export default function UIForgotPassword({ email, setEmail, handleSubmit }) {
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
          Forgot Password
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Input
            name="email"
            type="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            variant="bordered"
            color="default"
            radius="full"
            isRequired
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Send Reset Link
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
