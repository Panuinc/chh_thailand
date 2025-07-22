"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const layoutGroups = [
  ["Human", "Role"],
  ["Division", "Department"],
  ["Position", "User"],
];

const getPath = (label) =>
  label === "Human" ? "/human" : `/${label.toLowerCase()}`;

export default function HumanLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full">
      <div className="flex flex-row lg:flex-col items-center justify-start w-full lg:w-[15%] lg:h-full lg:p-2 p-2 gap-2 bg-black overflow-auto">
        {layoutGroups.map((group, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center w-full h-full lg:h-auto p-2 gap-2"
          >
            {group.map((label, subIndex) => {
              const href = getPath(label);
              const isActive =
                href === "/human"
                  ? pathname === href
                  : pathname.startsWith(href);

              return (
                <Link
                  key={subIndex}
                  href={href}
                  className={`flex items-center justify-center w-24 h-full lg:w-full lg:h-12 p-4 lg:p-2 gap-2 hover:bg-primary hover:text-white shadow-lg rounded-lg
                  ${isActive ? "bg-primary text-white" : "text-white"}`}
                >
                  {label}
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
