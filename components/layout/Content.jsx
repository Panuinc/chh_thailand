"use client";

export default function Content({ children }) {
  return (
    <div className="flex flex-col items-center justify-start w-full lg:w-[95%] h-full p-2 gap-2 border_custom overflow-auto">
      {children}
    </div>
  );
}
