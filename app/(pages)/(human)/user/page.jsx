"use client";

import UIUserList from "@/modules/human/user/components/UIUserList";
import { useFetchUsers } from "@/modules/human/user/hooks";

export default function UserList() {
  const { users, loading } = useFetchUsers();

  return (
    <UIUserList
      headerContent="User List"
      users={users}
      isLoading={loading}
    />
  );
}
