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
  { name: "Level", uid: "level", sortable: true },
  { name: "Bin Code", uid: "binCode", sortable: true },
  { name: "Bin Name", uid: "name", sortable: true },
  { name: "Bin Description", uid: "binDescription" },
  { name: "Bin Row", uid: "binRow" },
  { name: "Bin Type", uid: "binType" },
  { name: "Bin Usage", uid: "binUsage" },
  { name: "Bin Capacity", uid: "binCapacity" },
  { name: "Bin Occupancy", uid: "binOccupancy" },
  { name: "Bin Fill Rate", uid: "binFillRate" },
  { name: "Bin RFID", uid: "binRfidTagId" },
  { name: "Bin PosX", uid: "binPosX" },
  { name: "Bin PosY", uid: "binPosY" },
  { name: "Bin PosZ", uid: "binPosZ" },
  { name: "Bin RotX", uid: "binRotationX" },
  { name: "Bin RotY", uid: "binRotationY" },
  { name: "Bin RotZ", uid: "binRotationZ" },
  { name: "Bin Width", uid: "binWidth" },
  { name: "Bin Height", uid: "binHeight" },
  { name: "Bin Depth", uid: "binDepth" },
  { name: "Created By", uid: "creator" },
  { name: "Created At", uid: "createAt" },
  { name: "Updated By", uid: "updateBy" },
  { name: "Updated At", uid: "updateAt" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UIBinList({
  headerContent,
  bins: rawBins = [],
  isLoading,
}) {
  const bins = rawBins.map((r) => ({
    id: r.binId,
    store: r.binStore?.storeName || "-",
    zone: r.binZone?.zoneName || "-",
    aisle: r.binAisle?.aisleName || "-",
    rack: r.binRack?.rackName || "-",
    level: r.binLevel?.levelName || "-",
    binCode: r.binCode || "-",
    name: r.binName || "-",
    binDescription: r.binDescription || "-",
    binRow: r.binRow || "-",
    binType: r.binType || "-",
    binUsage: r.binUsage || "-",
    binCapacity: r.binCapacity ?? "-",
    binOccupancy: r.binOccupancy || "-",
    binFillRate: r.binFillRate ?? 0,
    binRfidTagId: r.binRfidTagId || "-",
    binPosX: r.binPosX ?? 0,
    binPosY: r.binPosY ?? 0,
    binPosZ: r.binPosZ ?? 0,
    binRotationX: r.binRotationX ?? 0,
    binRotationY: r.binRotationY ?? 0,
    binRotationZ: r.binRotationZ ?? 0,
    binWidth: r.binWidth ?? 0,
    binHeight: r.binHeight ?? 0,
    binDepth: r.binDepth ?? 0,
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.binCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.binUpdateAt),
    status: r.binStatus?.toLowerCase() || "enable",
  }));

  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={bins}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="bins"
          searchPlaceholder="Search by bin name..."
          basePath="/bin"
        />
      </div>
    </>
  );
}
