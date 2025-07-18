"use client";

import UIPositionList from "@/modules/human/position/components/UIPositionList";
import { useFetchPositions } from "@/modules/human/position/hooks";

export default function PositionList() {
  const { positions, loading } = useFetchPositions();

  return (
    <UIPositionList
      headerContent="Position List"
      positions={positions}
      isLoading={loading}
    />
  );
}
