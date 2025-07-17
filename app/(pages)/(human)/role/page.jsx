"use client";
import UIRoleList from "@/modules/human/role/components/UIRoleList";
import { useFetchRoles } from "@/modules/human/role/hooks";

export default function RoleList() {
  const { roles, loading } = useFetchRoles();

  return (
    <UIRoleList
      headerContent="Role List"
      roles={roles}
      isLoading={loading}
    />
  );
}
