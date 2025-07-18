"use client";

import Image from "next/image";
import { Input } from "@heroui/react";
import { AlignJustify, Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getSidebarItems } from "@/components/layout/sidebarItems";
import { useRouter } from "next/navigation";

export default function Header({ onMobileMenuToggle, onManualLogout }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const sidebarItems = getSidebarItems(onManualLogout)
    .filter((item) => item.href)
    .flatMap((item) =>
      item.href.map((link) => ({
        label: item.label,
        href: link,
      }))
    );

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems([]);
      setShowDropdown(false);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = sidebarItems.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.href.toLowerCase().includes(term)
    );

    setFilteredItems(results);
    setShowDropdown(true);
  }, [searchTerm]);

  const handleSelect = (href) => {
    setSearchTerm("");
    setShowDropdown(false);
    router.push(href);
  };

  return (
    <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-b-2 relative z-50">
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

      <div className="lg:flex hidden flex-row items-center justify-end w-full h-full p-2 gap-2 relative">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 relative">
          <Input
            name="search"
            type="text"
            placeholder="Search menu..."
            startContent={<Search />}
            variant="bordered"
            color="default"
            radius="full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {showDropdown && filteredItems.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow z-50 max-h-60 overflow-y-auto">
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item.href)}
                  className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                >
                  {item.label} -{" "}
                  <span className="text-md text-gray-500">{item.href}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden flex items-center justify-center aspect-square h-full p-2 gap-2 bg-white shadow-md rounded-full"
        >
          <AlignJustify />
        </button>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 bg-white hover:bg-primary hover:text-white shadow-md rounded-full">
          <Bell />
        </div>
        <div className="flex items-center justify-center w-12 h-12 p-2 gap-2 bg-primary shadow-md rounded-full">
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
