"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const layoutGroups = [
  ["Human", "Role"],
  ["Division", "Department"],
  ["Position", "User"],
];

const getPath = (label) =>
  label === "Human" ? "/pages/human" : `/pages/human/${label.toLowerCase()}`;

export default function HumanLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed rounded-2xl">
      <div className="flex flex-row lg:flex-col items-center justify-start w-full lg:w-2/12 lg:h-full p-2 gap-2 border-2 border-dark border-dashed rounded-xl overflow-auto">
        {layoutGroups.map((group, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-start w-full h-full lg:h-auto gap-2"
          >
            {group.map((label, subIndex) => {
              const href = getPath(label);
              const isActive = pathname === href;

              return (
                <Link
                  key={subIndex}
                  href={href}
                  className={`flex items-center justify-center w-24 h-full lg:w-1/2 lg:aspect-square p-2 gap-2 text-sm border-2 border-dark border-dashed rounded-full
                    ${
                      isActive
                        ? "bg-dark text-white"
                        : "bg-default hover:bg-dark hover:text-white"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-start w-full h-full lg:w-10/12 p-2 gap-2 border-2 border-dark border-dashed rounded-xl overflow-auto">
        {children}
      </div>
    </div>
  );
}
