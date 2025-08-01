"use client";

import UIBinList from "@/modules/warehouse/bin/components/UIBinList";
import { useFetchBins } from "@/modules/warehouse/bin/hooks";

export default function BinList() {
  const { bins, loading } = useFetchBins();

  return (
    <UIBinList
      headerContent="Bin List"
      bins={bins}
      isLoading={loading}
    />
  );
}
