import { HomeIcon } from "lucide-react";
import React from "react";

export default function UIHeader({ Header }) {
  return (
    <>
      <div className="flex items-center justify-start w-full p-2 gap-2 font-semibold border-2 border-dark border-dashed">
        <HomeIcon /> {Header}
      </div>
    </>
  );
}
