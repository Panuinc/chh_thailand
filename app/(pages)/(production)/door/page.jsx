"use client";

import UIDoorList from "@/modules/production/door/components/UIDoorList";
import { useFetchDoors } from "@/modules/production/door/hooks";

export default function DoorList() {
  const { doors, loading } = useFetchDoors();

  return (
    <UIDoorList
      headerContent="Door List"
      doors={doors}
      isLoading={loading}
    />
  );
}
