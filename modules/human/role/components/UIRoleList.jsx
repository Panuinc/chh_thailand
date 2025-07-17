"use client";

import React from "react";
import dynamic from "next/dynamic";
import UITopic from "@/components/topic/UITopic";
const UITable = dynamic(() => import("@/components/table/UITable"), {
  ssr: false,
});

export default function UIRoleList({ headerContent }) {
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2 border-2 border-dark border-dashed rounded-lg">
        <UITable />
      </div>
    </>
  );
}
