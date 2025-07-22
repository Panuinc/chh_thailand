import React from "react";
import UITopic from "@/components/topic/UITopic";
import Image from "next/image";

export default function UIOverView({ headerContent }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-start w-full h-full overflow-auto">
        <div className="lg:flex hidden flex-col items-center justify-center w-full lg:w-3/12 h-full p-2 gap-2 relative">
          <Image
            src="/picture/dashboard.jpg"
            alt="dashboard"
            fill
            style={{ objectFit: "cover"}}
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-start w-full lg:w-9/12 h-full">
          <UITopic Topic={headerContent} />
          <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom overflow-auto">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
              1
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
