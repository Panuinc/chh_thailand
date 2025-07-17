"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input, Tooltip } from "@heroui/react";
import {
  AlignJustify,
  Bell,
  Computer,
  Key,
  LayoutDashboard,
  Search,
  Settings,
  User,
  Warehouse,
  X,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Over View", href: "/pages/overview" },
  { icon: User, label: "Human", href: "/pages/human" },
  { icon: Computer, label: "Technology", href: "/pages/technology" },
  { icon: Warehouse, label: "Warehouse", href: "/pages/warehouse" },
  { icon: Settings, label: "Setting", href: "/pages/setting" },
  { icon: Key, label: "Sign Out", href: "/pages/Key" },
];

function Header({ onMobileMenuToggle }) {
  return (
    <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2">
          <Image
            src="/logo/logo.png"
            alt="logo"
            width={150}
            height={150}
            priority
          />
        </div>
      </div>
      <div className="lg:flex hidden flex-row items-center justify-end w-full h-full p-2 gap-2">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
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
      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden flex items-center justify-center aspect-square h-full p-2 gap-2 bg-default rounded-full"
        >
          <AlignJustify />
        </button>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 bg-default hover:bg-dark hover:text-white rounded-full">
          <Bell />
        </div>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 bg-primary rounded-full">
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
  const pathname = usePathname();

  return (
    <div className="lg:flex hidden flex-col items-center justify-start lg:w-[5%] h-full p-2 gap-2 overflow-auto">
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);

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
                className={`flex items-center justify-center w-12 h-12 p-2 gap-2 rounded-full ${
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

function MobileSidebar({ onClose }) {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-64 h-full z-50 bg-white p-2 flex flex-col gap-2">
      <button className="self-end mb-2" onClick={onClose}>
        <X />
      </button>
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={index}
            href={item.href}
            onClick={onClose}
            className="w-full flex justify-start items-center p-2 gap-2"
          >
            <div
              className={`flex items-center justify-center w-12 h-12 p-2 gap-2 rounded-full ${
                isActive
                  ? "bg-dark text-white"
                  : "bg-default hover:bg-dark hover:text-white"
              }`}
            >
              <Icon />
            </div>
            <span className="text-sm text-dark font-semibold">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function Content({ children }) {
  return (
    <div className="flex flex-col items-center justify-start w-full lg:w-[95%] h-full p-2 gap-2 border-4 border-dark border-dashed rounded-3xl overflow-auto">
      {children}
    </div>
  );
}

export default function PagesLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
        {isMobileMenuOpen && (
          <MobileSidebar onClose={() => setIsMobileMenuOpen(false)} />
        )}
        <div className="flex flex-row items-center justify-start w-full h-full p-2 gap-2 overflow-auto">
          <Sidebar />
          <Content>{children}</Content>
        </div>
      </div>
    </>
  );
}
