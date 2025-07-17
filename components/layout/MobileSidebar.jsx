"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function MobileSidebar({ sidebarItems, onClose }) {
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
              isActive ? "bg-dark text-white" : "bg-default hover:bg-dark hover:text-white"
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
            <span className="text-sm text-dark font-semibold">{item.label}</span>
          </Link>
        ) : (
          <div key={index} className="w-full flex justify-start items-center p-2 gap-2">
            {button}
            <span className="text-sm text-dark font-semibold">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
