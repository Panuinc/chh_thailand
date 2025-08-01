"use client";

import UIRackList from "@/modules/warehouse/rack/components/UIRackList";
import { useFetchRacks } from "@/modules/warehouse/rack/hooks";

export default function RackList() {
  const { racks, loading } = useFetchRacks();

  return (
    <UIRackList
      headerContent="Rack List"
      racks={racks}
      isLoading={loading}
    />
  );
}
