"use client";

import Image from "next/image";
import { Input } from "@heroui/react";
import { AlignJustify, Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getSidebarItems } from "@/components/layout/sidebarItems";
import { useRouter } from "next/navigation";
import { useSessionUser } from "@/hooks/useSessionUser";

export default function Header({ onMobileMenuToggle, onManualLogout }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const { userName } = useSessionUser();

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
    <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border_custom border-b-2 relative z-50">
      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2 border_custom">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 border_custom">
          <Image
            src="/logo/logo.png"
            alt="logo"
            width={150}
            height={150}
            priority
          />
        </div>
      </div>

      <div className="lg:flex hidden flex-row items-center justify-end w-full h-full p-2 gap-2 border_custom relative">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom relative">
          <Input
            name="search"
            type="text"
            placeholder="Search menu..."
            startContent={<Search />}
            variant="bordered"
            color="default"
            radius="none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {showDropdown && filteredItems.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-[#FFFFFF] border shadow z-50 max-h-60 overflow-y-auto">
              {filteredItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item.href)}
                  className="p-2 cursor-pointer"
                >
                  {item.label} - <span>{item.href}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-end w-full h-full p-2 gap-2 border_custom">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden flex items-center justify-center aspect-square h-full p-2 gap-2 border_custom"
        >
          <AlignJustify />
        </button>
        <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 border_custom">
          <Bell />
        </div>
        <div className="flex items-center justify-evenly w-full h-full p-2 gap-2 border_custom">
          <Image
            src="/picture/robot.png"
            alt="profile"
            width={25}
            height={25}
            priority
          />
          <span className="lg:flex hidden">
            {userName || "Guest"}
          </span>
        </div>
      </div>
    </div>
  );
}
