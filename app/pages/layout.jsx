"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AlignLeft,
  Bell,
  ChartLine,
  ChevronDown,
  ChevronLeft,
  Computer,
  Key,
  Moon,
  Sun,
  User,
} from "lucide-react";

export default function PagesLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <TopBar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-custom-use">
        <Sidebar collapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div
          className={`flex flex-col items-center justify-start w-full ${
            isSidebarCollapsed ? "xl:w-[94%]" : "xl:w-9/12"
          } h-full p-2 gap-2 border-custom overflow-auto`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function TopBar({ theme, toggleTheme }) {
  return (
    <div className="flex flex-row items-center justify-between w-full p-2 gap-2 border-custom-use">
      <div className="flex items-center justify-center h-full p-2 gap-2 border-custom">
        <Image
          src="/logo/logo.png"
          alt="logo"
          width={300}
          height={300}
          priority
        />
      </div>
      <div className="xl:hidden flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
        <AlignLeft />
      </div>
      <div className="xl:flex hidden items-center justify-center w-full h-full p-2 gap-2"></div>
      <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
        <Bell />
      </div>
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom"
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </button>
      <div className="flex items-center justify-start w-80 h-full p-2 gap-2 border-custom">
        Imag
      </div>
    </div>
  );
}

function Sidebar({ collapsed, toggleSidebar }) {
  return (
    <div
      className={`xl:flex hidden flex-col items-center justify-between w-full ${
        collapsed ? "xl:w-[6%]" : "xl:w-3/12"
      } h-full p-2 gap-2 border-custom overflow-auto`}
    >
      <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-custom">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom"
        >
          <ChevronLeft />
        </button>
        {!collapsed && (
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-custom">
            Header
          </div>
        )}
      </div>
      <SidebarMenu collapsed={collapsed} />
      <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-custom">
        <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
          <Key />
        </div>
        {!collapsed && (
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-custom">
            Sign Out
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarMenu({ collapsed }) {
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <ChartLine />,
      label: "Over View",
      hasDropdown: false,
      href: "/pages/overview",
    },
    {
      icon: <User />,
      label: "Human",
      hasDropdown: true,
      subItems: [
        { label: "Recruit", href: "/human/recruit" },
        { label: "Employee", href: "/human/employee" },
        { label: "Training", href: "/human/training" },
      ],
    },
    {
      icon: <Computer />,
      label: "Information Technology",
      hasDropdown: true,
      subItems: [
        { label: "Asset", href: "/it/asset" },
        { label: "Support Ticket", href: "/it/ticket" },
        { label: "System", href: "/it/system" },
      ],
    },
  ];

  useEffect(() => {
    if (!openMenu) {
      const activeMenu = menuItems.find((item) =>
        item.subItems?.some((sub) => pathname.startsWith(sub.href))
      );
      if (activeMenu) {
        setOpenMenu(activeMenu.label);
      }
    }
  }, [pathname, openMenu]);

  const handleClick = (item) => {
    if (item.hasDropdown) {
      setOpenMenu((prev) => (prev === item.label ? null : item.label));
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-2">
      {menuItems.map((item, index) => {
        const isActive = item.href && pathname === item.href;
        const isSubActive = item.subItems?.some((sub) => pathname === sub.href);
        const shouldOpen = openMenu === item.label;

        return (
          <div
            key={index}
            className="flex flex-col items-center justify-start w-full gap-2"
          >
            <div
              className={`flex flex-row items-center justify-center w-full p-2 gap-2 border-custom ${
                isActive || isSubActive
                  ? "bg-default font-semibold rounded-lg"
                  : ""
              }`}
              onClick={() => handleClick(item)}
            >
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
                {item.icon}
              </div>

              {!collapsed && (
                <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-custom">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="w-full h-full flex items-center gap-2"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </div>
              )}

              {!collapsed && item.hasDropdown && (
                <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      shouldOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
            </div>

            {!collapsed &&
              shouldOpen &&
              item.subItems?.map((sub, i) => {
                const isSubSelected = pathname === sub.href;
                return (
                  <div
                    key={i}
                    className="flex flex-row items-center justify-end w-full p-2 gap-2 border-custom"
                  >
                    <Link
                      href={sub.href}
                      className={`flex items-center justify-start w-10/12 h-full p-2 gap-2 border-custom text-sm ${
                        isSubSelected
                          ? "bg-default font-semibold rounded-lg"
                          : ""
                      }`}
                    >
                      {sub.label}
                    </Link>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
