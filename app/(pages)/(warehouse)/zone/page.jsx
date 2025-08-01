"use client";

import UIZoneList from "@/modules/warehouse/zone/components/UIZoneList";
import { useFetchZones } from "@/modules/warehouse/zone/hooks";

export default function ZoneList() {
  const { zones, loading } = useFetchZones();

  return (
    <UIZoneList
      headerContent="Zone List"
      zones={zones}
      isLoading={loading}
    />
  );
}
