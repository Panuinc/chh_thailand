"use client";

import UILevelList from "@/modules/warehouse/level/components/UILevelList";
import { useFetchLevels } from "@/modules/warehouse/level/hooks";

export default function LevelList() {
  const { levels, loading } = useFetchLevels();

  return (
    <UILevelList
      headerContent="Level List"
      levels={levels}
      isLoading={loading}
    />
  );
}
