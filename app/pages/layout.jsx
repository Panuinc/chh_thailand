"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input, Tooltip } from "@heroui/react";
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

const sidebarItems = [
  { icon: LayoutDashboard, label: "Over View", href: "/pages/overview" },
  { icon: User, label: "Human", href: "/pages/human" },
  { icon: Computer, label: "Technology", href: "/pages/technology" },
  { icon: Warehouse, label: "Warehouse", href: "/pages/warehouse" },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="xl:flex hidden flex-col items-center justify-start xl:w-[5%] h-full p-2 gap-2 border-2 border-dark border-dashed overflow-auto">
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Tooltip
            key={index}
            content={item.label}
            color="primary"
            className="text-dark font-semibold"
            placement="right"
            showArrow
          >
            <Link href={item.href} className="w-full flex justify-center">
              <div
                className={`flex items-center justify-center w-12 h-12 p-2 gap-2 border-2 border-dark border-dashed rounded-full
                ${
                  isActive
                    ? "bg-dark text-white"
                    : "bg-default hover:bg-dark hover:text-white"
                }`}
              >
                <Icon />
              </div>
            </Link>
          </Tooltip>
        );
      })}
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
