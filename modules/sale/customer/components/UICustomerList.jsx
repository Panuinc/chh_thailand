"use client";

import React, { useState, useMemo } from "react";
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
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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

const pieColorMap = {
  Owner: "#60a5fa",
  CM: "#34d399",
  MainConstruction: "#facc15",
  DesignerArchitect: "#f472b6",
  EndUser: "#a78bfa",
  Dealer: "#fb923c",
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

  const totalCustomers = rawCustomers.length;

  const customers = filteredCustomers.map((r) => ({
    id: r.customerId,
    name: r.customerName || "-",
    address: r.customerAddress || "-",
    phone: r.customerPhone || "-",
    type: (
      <span
        className={`w-full h-full p-2 rounded-full ${
          typeColorMap[r.customerType]
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

  const chartData = useMemo(() => {
    const countMap = {};
    rawCustomers.forEach((c) => {
      const type = c.customerType || "Unknown";
      countMap[type] = (countMap[type] || 0) + 1;
    });

    return Object.entries(countMap).map(([type, count]) => ({
      name: type,
      value: count,
      percent: ((count / totalCustomers) * 100).toFixed(1),
      fill: pieColorMap[type] || "#d1d5db",
    }));
  }, [rawCustomers, totalCustomers]);

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

      <div className="flex flex-row items-center justify-center w-full min-h-96 p-2 gap-2">
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${percent}%`}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) =>
                    `${value} customers (${props.payload.percent}%)`
                  }
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            {""}
          </div>
        </div>
      </div>

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
