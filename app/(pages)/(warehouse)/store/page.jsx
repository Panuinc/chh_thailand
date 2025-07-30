"use client";

import UIStoreList from "@/modules/warehouse/store/components/UIStoreList";
import { useFetchStores } from "@/modules/warehouse/store/hooks";

export default function StoreList() {
  const { stores, loading } = useFetchStores();

  return (
    <UIStoreList
      headerContent="Store List"
      stores={stores}
      isLoading={loading}
    />
  );
}
