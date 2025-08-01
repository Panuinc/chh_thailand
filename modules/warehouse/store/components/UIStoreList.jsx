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
  { name: "Store Code", uid: "storeCode", sortable: true },
  { name: "Store Name", uid: "name", sortable: true },
  { name: "Store Location", uid: "storeLocation" },
  { name: "Store Description", uid: "storeDescription" },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UIStoreList({
  headerContent,
  stores: rawStores = [],
  isLoading,
}) {
  const stores = rawStores.map((r) => ({
    id: r.storeId,
    storeCode: r.storeCode || "-",
    name: r.storeName || "-",
    storeLocation: r.storeLocation || "-",
    storeDescription: r.storeDescription || "-",
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.storeCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.storeUpdateAt),
    status: r.storeStatus?.toLowerCase() || "enable",
  }));
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={stores}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="stores"
          searchPlaceholder="Search by store name..."
          basePath="/store"
        />
      </div>
    </>
  );
}
