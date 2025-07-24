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
  { name: "Customer", uid: "name", sortable: true },
  { name: "Address", uid: "address" },
  { name: "Phone", uid: "phone" },
  { name: "Type", uid: "type" },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

const typeColorMap = {
  Owner: "bg-blue-100 text-blue-800",
  CM: "bg-green-100 text-green-800",
  MainConstruction: "bg-yellow-100 text-yellow-800",
  DesignerArchitect: "bg-pink-100 text-pink-800",
  EndUser: "bg-purple-100 text-purple-800",
  Dealer: "bg-orange-100 text-orange-800",
};

export default function UICustomerList({
  headerContent,
  customers: rawCustomers = [],
  isLoading,
}) {
  const customers = rawCustomers.map((r) => ({
    id: r.customerId,
    name: r.customerName || "-",
    address: r.customerAddress || "-",
    phone: r.customerPhone || "-",
    type: (
      <span className={`p-2 rounded-full ${typeColorMap[r.customerType]}`}>
        {r.customerType || "-"}
      </span>
    ),
    creator:
      [r.createdBy?.userFirstName, r.createdBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    createAt: dateToThai(r.customerCreateAt),
    updateBy:
      [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
        .filter(Boolean)
        .join(" ") || "-",
    updateAt: dateToThai(r.customerUpdateAt),
    status: r.customerStatus?.toLowerCase() || "enable",
  }));

  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={customers}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="customers"
          searchPlaceholder="Search by customer name..."
          basePath="/customer"
        />
      </div>
    </>
  );
}
