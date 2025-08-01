"use client";

import UIAisleList from "@/modules/warehouse/aisle/components/UIAisleList";
import { useFetchAisles } from "@/modules/warehouse/aisle/hooks";

export default function AisleList() {
  const { aisles, loading } = useFetchAisles();

  return (
    <UIAisleList
      headerContent="Aisle List"
      aisles={aisles}
      isLoading={loading}
    />
  );
}
