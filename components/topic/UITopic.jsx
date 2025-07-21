import { HomeIcon } from "lucide-react";
import React from "react";

export default function UITopic({ Topic }) {
  return (
    <>
      <div className="flex items-center justify-start w-full gap-2">
        <div className="flex items-center justify-center h-full px-12 py-4 gap-2 font-semibold shadow-md rounded-lg">
          <HomeIcon /> {Topic}
        </div>
      </div>
    </>
  );
}
