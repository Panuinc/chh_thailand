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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
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
        <div className="xl:flex hidden items-center justify-center w-full h-full p-2 gap-2">
          {" "}
        </div>
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

      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-custom">
        <div className="xl:flex hidden flex-col items-center justify-between w-full xl:w-3/12 h-full p-2 gap-2 border-custom overflow-auto">
          <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-custom">
            <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
              <ChevronLeft />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-custom">
              Header
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-full h-full gap-2">
            <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-custom">
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
                <ChartLine />
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-custom">
                Over View
              </div>
            </div>
            <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-custom">
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
                <User />
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-custom">
                Human
              </div>
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
                <ChevronDown />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-custom">
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
                <Computer />
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-custom">
                Information Technology
              </div>
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
                <ChevronDown />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-custom">
            <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border-custom">
              <Key />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-custom">
              Sign Out
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full xl:w-9/12 h-full p-2 gap-2 border-custom overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
