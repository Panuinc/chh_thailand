import React from "react";
import UITopic from "@/components/topic/UITopic";

export default function UIRoleForm({ headerContent }) {
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border-2 border-dark border-dashed rounded-lg">
        1
      </div>
    </>
  );
}
