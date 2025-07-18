"use client";
import Image from "next/image";
import { Input } from "@heroui/react";
import { AlignJustify, Bell, Search } from "lucide-react";

export default function Header({ onMobileMenuToggle }) {
  return (
    <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2">
          <Image src="/logo/logo.png" alt="logo" width={150} height={150} priority />
        </div>
      </div>
      <div className="lg:flex hidden flex-row items-center justify-end w-full h-full p-2 gap-2">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Input
            name="search"
            type="text"
            placeholder="Search..."
            startContent={<Search />}
            variant="bordered"
            color="default"
            radius="full"
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden flex items-center justify-center aspect-square h-full p-2 gap-2 bg-default rounded-full"
        >
          <AlignJustify />
        </button>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 bg-default hover:bg-primary hover:text-white rounded-full">
          <Bell />
        </div>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 bg-primary rounded-full">
          <Image src="/picture/robot.png" alt="profile" width={300} height={300} priority />
        </div>
      </div>
    </div>
  );
}
