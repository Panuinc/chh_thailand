"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <Topbar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-custom">
        <Sidebar collapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div
          className={`flex flex-col items-center justify-start w-full ${
            isSidebarCollapsed ? "xl:w-11/12" : "xl:w-9/12"
          } h-full p-2 gap-2 border-custom overflow-auto`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Topbar({ theme, toggleTheme }) {
  return (
    <div className="flex flex-row items-center justify-between w-full p-2 gap-2 border-custom">
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
        collapsed ? "xl:w-1/12" : "xl:w-3/12"
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

  const menuItems = [
    {
      icon: <ChartLine />,
      label: "Over View",
      hasDropdown: false,
    },
    {
      icon: <User />,
      label: "Human",
      hasDropdown: true,
      subItems: ["Recruit", "Employee", "Training"],
    },
    {
      icon: <Computer />,
      label: "Information Technology",
      hasDropdown: true,
      subItems: ["Asset", "Support Ticket", "System"],
    },
  ];

  const handleClick = (item) => {
    if (item.hasDropdown) {
      setOpenMenu((prev) => (prev === item.label ? null : item.label));
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-2">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-start w-full gap-2"
        >
          <div
            className="flex flex-row items-center justify-center w-full p-2 gap-2 border-custom"
            onClick={() => handleClick(item)}
          >
            <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
              {item.icon}
            </div>
            {!collapsed && (
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-custom">
                {item.label}
              </div>
            )}
            {!collapsed && item.hasDropdown && (
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    openMenu === item.label ? "rotate-180" : ""
                  }`}
                />
              </div>
            )}
          </div>

          {!collapsed &&
            openMenu === item.label &&
            item.subItems?.map((sub, i) => (
              <div
                key={i}
                className="flex flex-row items-center justify-end w-full p-2 gap-2 border-custom"
              >
                <div className="flex items-center justify-start w-10/12 h-full p-2 gap-2 border-custom">
                  {sub}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
