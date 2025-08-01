"use client";

import React from "react";
import dynamic from "next/dynamic";
import UITopic from "@/components/topic/UITopic";
import { dateToThai } from "@/lib/date";
const UITable = dynamic(() => import("@/components/table/UITable"), {
  ssr: false,
});

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Store", uid: "store", sortable: true },
  { name: "Zone", uid: "zone", sortable: true },
  { name: "Aisle", uid: "aisle", sortable: true },
  { name: "Rack", uid: "rack", sortable: true },
  { name: "Level Code", uid: "levelCode", sortable: true },
  { name: "Level Name", uid: "name", sortable: true },
  { name: "Level Description", uid: "levelDescription" },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UILevelList({
  headerContent,
  levels: rawLevels = [],
  isLoading,
}) {
  const levels = rawLevels.map((r) => ({
    id: r.levelId,
    store: r.levelStore?.storeName || "-",
    zone: r.levelZone?.zoneName || "-",
    aisle: r.levelAisle?.aisleName || "-",
    rack: r.levelRack?.rackName || "-",
    levelCode: r.levelCode || "-",
    name: r.levelName || "-",
    levelDescription: r.levelDescription || "-",
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.levelCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.levelUpdateAt),
    status: r.levelStatus?.toLowerCase() || "enable",
  }));
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={levels}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="levels"
          searchPlaceholder="Search by level name..."
          basePath="/level"
        />
      </div>
    </>
  );
}
