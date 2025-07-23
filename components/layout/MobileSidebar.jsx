"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function MobileSidebar({ sidebarItems, onClose }) {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-64 h-full z-50 bg-black flex flex-col p-2 gap-2">
      <button
        className="self-end mb-2 p-2 bg-danger text-white rounded-full"
        onClick={onClose}
      >
        <X />
      </button>
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const hrefList = Array.isArray(item.href) ? item.href : [item.href];
        const isActive = hrefList.some((href) => pathname.startsWith(href));

        const button = (
          <div
            className={`flex items-center justify-center w-12 h-12 p-2 gap-2 hover:bg-primary hover:text-white shadow-lg rounded-lg cursor-pointer ${
              isActive
                ? "bg-primary text-white"
                : "text-white"
            }`}
          >
            <Icon />
          </div>
        );

        if (item.href) {
          return (
            <Link
              key={index}
              href={hrefList[0]}
              onClick={() => {
                onClose();
                item.onClick?.();
              }}
              className="w-full flex justify-start items-center p-2 gap-2"
            >
              {button}
              <span className="text-sm text-white">{item.label}</span>
            </Link>
          );
        } else {
          return (
            <div
              key={index}
              onClick={() => {
                onClose();
                item.onClick?.();
              }}
              className="w-full flex justify-start items-center p-2 gap-2 cursor-pointer"
            >
              {button}
              <span className="text-sm text-white">{item.label}</span>
            </div>
          );
        }
      })}
    </div>
  );
}
