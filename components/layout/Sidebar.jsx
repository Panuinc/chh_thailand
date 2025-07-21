"use client";
import { Tooltip } from "@heroui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ sidebarItems }) {
  const pathname = usePathname();

  return (
    <div className="lg:flex hidden flex-col items-center justify-start lg:w-[5%] h-full p-2 gap-2 overflow-auto">
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const hrefList  = Array.isArray(item.href) ? item.href : [item.href];
        const isActive = hrefList .some((href) => pathname.startsWith(href));

        const button = (
          <div
            key={index}
            onClick={item.onClick}
            className={`flex items-center justify-center w-12 h-12 p-2 gap-2 shadow-md rounded-lg cursor-pointer ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            <Icon />
          </div>
        );

        return item.href ? (
          <Tooltip
            key={index}
            content={item.label}
            color="secondary"
            className="px-4 py-2"
            placement="right"
            showArrow
          >
            <Link href={hrefList [0]} className="w-full flex justify-center">
              {button}
            </Link>
          </Tooltip>
        ) : (
          <Tooltip
            key={index}
            content={item.label}
            color="secondary"
            className="px-4 py-2"
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
