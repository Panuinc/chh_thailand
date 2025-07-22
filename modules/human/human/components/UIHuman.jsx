import React from "react";
import UITopic from "@/components/topic/UITopic";

export default function UIHuman({ headerContent }) {
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom overflow-auto">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
          1
        </div>
      </div>
    </>
  );
}
