"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Input, Tooltip } from "@heroui/react";
import { logUserLogout } from "@/lib/userLogger";
import Loading from "@/components/loading/UILoading";
import Image from "next/image";
import Link from "next/link";
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
            name="search"
            type="text"
            placeholder="Search..."
            startContent={<Search />}
            variant="bordered"
            color="primary"
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
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 bg-dark rounded-full">
          <Image
            src="/picture/robot.png"
            alt="profile"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>
    </div>
  );
}

function Sidebar({ sidebarItems }) {
  const pathname = usePathname();

  return (
    <div className="lg:flex hidden flex-col items-center justify-start lg:w-[5%] h-full p-2 gap-2 overflow-auto">
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href || "");

        const button = (
          <div
            key={index}
            onClick={item.onClick}
            className={`flex items-center justify-center w-12 h-12 p-2 gap-2 rounded-full cursor-pointer ${
              isActive
                ? "bg-dark text-white"
                : "bg-default hover:bg-dark hover:text-white"
            }`}
          >
            <Icon />
          </div>
        );

        return item.href ? (
          <Tooltip
            key={index}
            content={item.label}
            color="primary"
            className="text-white font-semibold"
            placement="right"
            showArrow
          >
            <Link href={item.href} className="w-full flex justify-center">
              {button}
            </Link>
          </Tooltip>
        ) : (
          <Tooltip
            key={index}
            content={item.label}
            color="primary"
            className="text-white font-semibold"
            placement="right"
            showArrow
          >
            <div className="w-full flex justify-center">{button}</div>
          </Tooltip>
        );
      })}
    </div>
  );
}

function MobileSidebar({ sidebarItems, onClose }) {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-64 h-full z-50 bg-white p-2 flex flex-col gap-2">
      <button className="self-end mb-2" onClick={onClose}>
        <X />
      </button>
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href || "");

        const button = (
          <div
            onClick={() => {
              onClose();
              item.onClick?.();
            }}
            className={`flex items-center justify-center w-12 h-12 p-2 gap-2 rounded-full cursor-pointer ${
              isActive
                ? "bg-dark text-white"
                : "bg-default hover:bg-dark hover:text-white"
            }`}
          >
            <Icon />
          </div>
        );

        return item.href ? (
          <Link
            key={index}
            href={item.href}
            onClick={onClose}
            className="w-full flex justify-start items-center p-2 gap-2"
          >
            {button}
            <span className="text-sm text-dark font-semibold">
              {item.label}
            </span>
          </Link>
        ) : (
          <div
            key={index}
            className="w-full flex justify-start items-center p-2 gap-2"
          >
            {button}
            <span className="text-sm text-dark font-semibold">
              {item.label}
            </span>
          </div>
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
  const { data: session, status } = useSession();

  const handleManualLogout = async () => {
    try {
      if (session?.user?.id) {
        await logUserLogout({
          userId: parseInt(session.user.id),
          username: session.user.nameTH,
          ipAddress: null,
          userAgent: navigator.userAgent,
        });
      }
    } catch (err) {
    } finally {
      await signOut({ callbackUrl: "/" });
    }
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Over View", href: "/overview" },
    { icon: User, label: "Human", href: "/human" },
    { icon: Computer, label: "Technology", href: "/technology" },
    { icon: Warehouse, label: "Warehouse", href: "/warehouse" },
    { icon: Settings, label: "Setting", href: "/setting" },
    { icon: Key, label: "Sign Out", onClick: handleManualLogout },
  ];

  useEffect(() => {
    if (session?.expires) {
      const expiry = new Date(session.expires).getTime();
      const now = Date.now();
      if (now > expiry) {
        signOut({ callbackUrl: "/" });
      }
    }
  }, [session]);

  if (status === "loading") return <Loading />;
  if (!session) {
    signOut({ callbackUrl: "/" });
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      {isMobileMenuOpen && (
        <MobileSidebar
          sidebarItems={sidebarItems}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div className="flex flex-row items-center justify-start w-full h-full p-2 gap-2 overflow-auto">
        <Sidebar sidebarItems={sidebarItems} />
        <Content>{children}</Content>
      </div>
    </div>
  );
}
