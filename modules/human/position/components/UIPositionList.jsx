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
  { name: "Division", uid: "division", sortable: true },
  { name: "Department", uid: "department", sortable: true },
  { name: "Position", uid: "name", sortable: true },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UIPositionList({
  headerContent,
  positions: rawPositions = [],
  isLoading,
}) {
  const positions = rawPositions.map((r) => ({
    id: r.positionId,
    division: r.division?.divisionName || "-",
    department: r.department?.departmentName || "-",
    name: r.positionName || "-",
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.positionCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.positionUpdateAt),
    status: r.positionStatus?.toLowerCase() || "enable",
  }));
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2 border_custom">
        <UITable
          data={positions}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="positions"
          searchPlaceholder="Search by position name..."
          basePath="/position"
        />
      </div>
    </>
  );
}
