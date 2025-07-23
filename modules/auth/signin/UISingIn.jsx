"use client";

import React from "react";
import Image from "next/image";
import { Input, Button } from "@heroui/react";
import Link from "next/link";

export default function UISingIn({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) {
  return (
    <>
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
            Internal System
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="username"
              type="text"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your username"
              variant="bordered"
              color="default"
              radius="full"
              isRequired
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="password"
              type="password"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              variant="bordered"
              color="default"
              radius="full"
              isRequired
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end w-full h-full p-2 gap-2">
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Button
              onPress={handleLogin}
              type="submit"
              color="primary"
              radius="full"
              className="w-9/12 h-full p-3 gap-2"
            >
              Sign In
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
    </>
  );
}
