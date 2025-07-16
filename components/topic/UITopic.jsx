import { HomeIcon } from "lucide-react";
import React from "react";

export default function UITopic({ Topic }) {
  return (
    <>
      <div className="flex items-center justify-start w-full p-2 gap-2 text-xl font-semibold">
        <HomeIcon /> {Topic}
      </div>
    </>
  );
}
