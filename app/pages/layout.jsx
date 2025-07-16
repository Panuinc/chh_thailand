"use client";
import Image from "next/image";
import { Input } from "@heroui/react";
import {
  AlignJustify,
  Bell,
  Computer,
  LayoutDashboard,
  Search,
  Settings,
  User,
  Warehouse,
} from "lucide-react";

function Header() {
  return (
    <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-2 border-dark border-dashed">
      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
          <Image
            src="/logo/logo.png"
            alt="logo"
            width={150}
            height={150}
            priority
          />
        </div>
      </div>
      <div className="xl:flex hidden flex-row items-center justify-end w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
          <Input
            name="password"
            type="text"
            placeholder="Search..."
            startContent={<Search />}
            variant="bordered"
            color="default"
            radius="full"
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
        <div className="xl:hidden flex items-center justify-center aspect-square h-full p-2 gap-2 border-2 border-dark border-dashed bg-default rounded-full">
          <AlignJustify />
        </div>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-dark border-dashed bg-default rounded-full">
          <Settings />
        </div>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-dark border-dashed bg-default rounded-full">
          <Bell />
        </div>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-dark border-dashed bg-primary rounded-full">
          <Image
            src="/picture/robot.png"
            alt="picture-2"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="xl:flex hidden flex-col items-center justify-start xl:w-[5%] h-full p-2 gap-2 border-2 border-dark border-dashed overflow-auto">
      <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-dark border-dashed bg-default hover:bg-dark hover:text-white rounded-full">
        <LayoutDashboard />
      </div>
      <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-dark border-dashed bg-default hover:bg-dark hover:text-white rounded-full">
        <User />
      </div>
      <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-dark border-dashed bg-default hover:bg-dark hover:text-white rounded-full">
        <Computer />
      </div>
      <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-dark border-dashed bg-default hover:bg-dark hover:text-white rounded-full">
        <Warehouse />
      </div>
    </div>
  );
}

function Content({ children }) {
  return (
    <div className="flex flex-col items-center justify-start w-full xl:w-[95%] h-full p-2 gap-2 border-2 border-dark border-dashed overflow-auto">
      {children}
    </div>
  );
}
export default function PagesLayout({ children }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        <Header />
        <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
          <Sidebar />
          <Content>{children}</Content>
        </div>
      </div>
    </>
  );
}
