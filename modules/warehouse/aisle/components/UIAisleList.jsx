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
  { name: "Aisle Code", uid: "aisleCode", sortable: true },
  { name: "Aisle Name", uid: "name", sortable: true },
  { name: "Aisle Description", uid: "aisleDescription" },
  { name: "aislePosX", uid: "aislePosX" },
  { name: "aislePosY", uid: "aislePosY" },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UIAisleList({
  headerContent,
  aisles: rawAisles = [],
  isLoading,
}) {
  const aisles = rawAisles.map((r) => ({
    id: r.aisleId,
    store: r.aisleStore?.storeName || "-",
    zone: r.aisleZone?.zoneName || "-",
    aisleCode: r.aisleCode || "-",
    name: r.aisleName || "-",
    aisleDescription: r.aisleDescription || "-",
    aislePosX: r.aislePosX || "-",
    aislePosY: r.aislePosY || "-",
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.aisleCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.aisleUpdateAt),
    status: r.aisleStatus?.toLowerCase() || "enable",
  }));
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={aisles}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="aisles"
          searchPlaceholder="Search by aisle name..."
          basePath="/aisle"
        />
      </div>
    </>
  );
}
