"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSidebarItems } from "@/components/layout/sidebarItems";
import { signOut } from "next-auth/react";

const dummyLogout = async () => {
  await signOut({ callbackUrl: "/" });
};

export default function SideBarSection({ sectionKey, children }) {
  const pathname = usePathname();
  const sidebarItems = getSidebarItems(dummyLogout);

  const sectionItem = sidebarItems.find(
    (item) => item.label.toLowerCase() === sectionKey.toLowerCase()
  );
  const subRoutes = sectionItem?.href || [];

  const layoutGroups = [];
  for (let i = 0; i < subRoutes.length; i += 2) {
    layoutGroups.push(subRoutes.slice(i, i + 2));
  }

  const getLabel = (href) => {
    const path = href.replace("/", "");
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full">
      <div className="flex flex-row lg:flex-col items-center justify-start w-full lg:w-[15%] lg:h-full lg:p-2 p-2 gap-2 bg-black overflow-auto">
        {layoutGroups.map((group, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center w-full h-full lg:h-auto p-2 gap-2"
          >
            {group.map((href, subIndex) => {
              const isActive =
                href === `/${sectionKey.toLowerCase()}`
                  ? pathname === href
                  : pathname.startsWith(href);

              return (
                <Link
                  key={subIndex}
                  href={href}
                  className={`flex items-center justify-center w-24 h-full lg:w-full lg:h-12 p-4 lg:p-2 gap-2 hover:bg-primary hover:text-white shadow-lg rounded-lg
                  ${isActive ? "bg-primary text-white" : "text-white"}`}
                >
                  {getLabel(href)}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-start w-full h-full lg:w-[85%] overflow-auto">
        {children}
      </div>
    </div>
  );
}
