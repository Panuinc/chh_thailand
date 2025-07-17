"use client";

import React, { useEffect, useState } from "react";
import UIRoleList from "@/modules/human/role/components/UIRoleList";

export default function RoleList() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/human/role", {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });
        const data = await res.json();

        if (!res.ok) {
          console.warn("⚠️ Warning:", data.error || "Unknown error");
          setRoles([]);
          return;
        }

        setRoles(Array.isArray(data.role) ? data.role : []);
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <>
      <UIRoleList
        headerContent="Role List"
        roles={roles}
        isLoading={isLoading}
      />
    </>
  );
}
