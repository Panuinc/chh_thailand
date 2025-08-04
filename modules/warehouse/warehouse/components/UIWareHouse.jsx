"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { useFetchStores } from "@/modules/warehouse/store/hooks";

export default function UIWarehouseLayout({ headerContent }) {
  return (
    <>
      <UITopic Topic={headerContent} />
    </>
  );
}
