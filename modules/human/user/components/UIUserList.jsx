"use client";

import React from "react";
import dynamic from "next/dynamic";
import UITopic from "@/components/topic/UITopic";
import { dateToThai } from "@/lib/date";
import { User } from "@heroui/react";

const UITable = dynamic(() => import("@/components/table/UITable"), {
  ssr: false,
});

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "User", uid: "nameDisplay", sortable: true },
  { name: "Email", uid: "email" },
  { name: "Role", uid: "role" },
  { name: "Team", uid: "team" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Enable", uid: "enable" },
  { name: "Disable", uid: "disable" },
];

export default function UIUserList({
  headerContent,
  users: rawUsers = [],
  isLoading,
}) {
  const users = rawUsers.map((r) => {
    const name = `${r.userFirstName || ""} ${r.userLastName || ""}`.trim();

    return {
      id: r.userId,
      name,
      nameDisplay: (
        <User
          name={name}
          description={r.userEmail || "-"}
          avatarProps={{
            radius: "full",
            size: "md",
            src:
              r.userPicture &&
              (r.userPicture.startsWith("http") || r.userPicture.includes("/"))
                ? r.userPicture
                : r.userPicture &&
                  /\.(png|jpe?g|webp|gif)$/i.test(r.userPicture)
                ? `/userPicture/${r.userPicture}`
                : undefined,
            fallback: "No pic",
          }}
        />
      ),
      email: r.userEmail || "-",
      role: r.job?.role?.roleName || "-",
      team: r.job?.department?.departmentName || "-",
      status: r.userStatus?.toLowerCase() || "enable",
      created: dateToThai(r.userCreateAt),
      updated: dateToThai(r.userUpdateAt),
    };
  });

  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="flex items-center justify-center w-full p-2 gap-2">
        <UITable
          data={users}
          isLoading={isLoading}
          columns={columns}
          statusOptions={statusOptions}
          entityNamePlural="users"
          searchPlaceholder="Search by user name..."
          basePath="/user"
        />
      </div>
    </>
  );
}
