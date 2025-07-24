"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import UITopic from "@/components/topic/UITopic";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { ChevronDown } from "lucide-react";
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

const typeOptions = [
  "Owner",
  "CM",
  "MainConstruction",
  "DesignerArchitect",
  "EndUser",
  "Dealer",
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
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredCustomers = rawCustomers.filter((c) =>
    typeFilter === "all" ? true : c.customerType === typeFilter
  );

  const customers = filteredCustomers.map((r) => ({
    id: r.customerId,
    name: r.customerName || "-",
    address: r.customerAddress || "-",
    phone: r.customerPhone || "-",
    type: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          typeColorMap[r.customerType] || "bg-gray-100 text-gray-800"
        }`}
      >
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

  const extraFiltersSlot = (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="default"
          radius="full"
          className="w-full h-full p-3 gap-2"
          endContent={<ChevronDown />}
        >
          {typeFilter === "all" ? "Customer Type" : typeFilter}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        selectedKeys={new Set([typeFilter])}
        onSelectionChange={(keys) =>
          setTypeFilter(keys.values().next().value || "all")
        }
      >
        <DropdownItem key="all">All Types</DropdownItem>
        {typeOptions.map((type) => (
          <DropdownItem key={type}>{type}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );

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
          extraFiltersSlot={extraFiltersSlot}
        />
      </div>
    </>
  );
}
