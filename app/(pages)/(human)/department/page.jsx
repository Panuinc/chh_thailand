"use client";

import UIDepartmentList from "@/modules/human/department/components/UIDepartmentList";
import { useFetchDepartments } from "@/modules/human/department/hooks";

export default function DepartmentList() {
  const { departments, loading } = useFetchDepartments();

  return (
    <UIDepartmentList
      headerContent="Department List"
      departments={departments}
      isLoading={loading}
    />
  );
}
