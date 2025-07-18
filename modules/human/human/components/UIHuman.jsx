import React from "react";
import UITopic from "@/components/topic/UITopic";

export default function UIHuman({ headerContent }) {
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom rounded-lg">
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom rounded-lg">
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom rounded-lg">
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
        <div className="flex items-center justify-center w-full h-40 p-2 gap-2 border_custom">
          1
        </div>
      </div>
    </>
  );
}
