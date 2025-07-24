import React from "react";
import UITopic from "@/components/topic/UITopic";

export default function UIProduction({ headerContent }) {
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 overflow-auto">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-700 animate-bounce tracking-wide">
            🚧Production Coming Soon 🚀
          </h1>
        </div>
      </div>
    </>
  );
}
