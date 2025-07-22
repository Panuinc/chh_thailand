"use client";

export default function Content({ children }) {
  return (
    <div className="flex flex-col items-center justify-start w-full lg:w-[95%] h-full gap-2 overflow-auto">
      {children}
    </div>
  );
}
