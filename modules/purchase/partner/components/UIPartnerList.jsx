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
  { name: "Partner", uid: "name", sortable: true },
  { name: "Tax", uid: "tax" },
  { name: "Phone", uid: "phone" },
  { name: "Address", uid: "address" },
  { name: "Email", uid: "email" },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UIPartnerList({
  headerContent,
  partners: rawPartners = [],
  isLoading,
}) {
  const partners = rawPartners.map((r) => ({
    id: r.partnerId,
    name: r.partnerName || "-",
    tax: r.partnerTaxId || "-",
    phone: r.partnerPhone || "-",
    address: r.partnerAddress || "-",
    email: r.partnerEmail || "-",
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.partnerCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.partnerUpdateAt),
    status: r.partnerStatus?.toLowerCase() || "enable",
  }));
  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={partners}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="partners"
          searchPlaceholder="Search by partner name..."
          basePath="/partner"
        />
      </div>
    </>
  );
}
