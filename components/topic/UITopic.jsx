import { HomeIcon } from "lucide-react";
import React from "react";

export default function UITopic({ Topic }) {
  return (
    <>
      <div className="flex items-center justify-start w-full p-2 gap-2 border_custom">
        <div className="flex items-center justify-center h-full p-2 gap-2 border_custom">
          <HomeIcon /> {Topic}
        </div>
      </div>
    </>
  );
}
