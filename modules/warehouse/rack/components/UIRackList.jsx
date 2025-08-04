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
  { name: "Rack Code", uid: "rackCode", sortable: true },
  { name: "Rack Name", uid: "name", sortable: true },
  { name: "Rack Description", uid: "rackDescription" },
  { name: "rackPosX", uid: "rackPosX" },
  { name: "rackPosY", uid: "rackPosY" },
  { name: "rackPosZ", uid: "rackPosZ" },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UIRackList({
  headerContent,
  racks: rawRacks = [],
  isLoading,
}) {
  const racks = rawRacks.map((r) => ({
    id: r.rackId,
    store: r.rackStore?.storeName || "-",
    zone: r.rackZone?.zoneName || "-",
    aisle: r.rackAisle?.aisleName || "-",
    rackCode: r.rackCode || "-",
    name: r.rackName || "-",
    rackDescription: r.rackDescription || "-",
    rackPosX: r.rackPosX || "-",
    rackPosY: r.rackPosY || "-",
    rackPosZ: r.rackPosZ || "-",
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.rackCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.rackUpdateAt),
    status: r.rackStatus?.toLowerCase() || "enable",
  }));
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={racks}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="racks"
          searchPlaceholder="Search by rack name..."
          basePath="/rack"
        />
      </div>
    </>
  );
}
