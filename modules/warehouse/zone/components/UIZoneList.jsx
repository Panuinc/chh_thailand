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
  { name: "Zone Code", uid: "zoneCode", sortable: true },
  { name: "Zone Name", uid: "name", sortable: true },
  { name: "Zone Description", uid: "zoneDescription" },
  { name: "zonePosX", uid: "zonePosX" },
  { name: "zonePosY", uid: "zonePosY" },
  { name: "zonePosZ", uid: "zonePosZ" },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UIZoneList({
  headerContent,
  zones: rawZones = [],
  isLoading,
}) {
  const zones = rawZones.map((r) => ({
    id: r.zoneId,
    store: r.zoneStore?.storeName || "-",
    zoneCode: r.zoneCode || "-",
    name: r.zoneName || "-",
    zoneDescription: r.zoneDescription || "-",
    zonePosX: r.zonePosX || "-",
    zonePosY: r.zonePosY || "-",
    zonePosZ: r.zonePosZ || "-",
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.zoneCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.zoneUpdateAt),
    status: r.zoneStatus?.toLowerCase() || "enable",
  }));
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={zones}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="zones"
          searchPlaceholder="Search by zone name..."
          basePath="/zone"
        />
      </div>
    </>
  );
}
