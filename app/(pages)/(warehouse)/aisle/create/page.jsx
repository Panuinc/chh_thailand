"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitAisle } from "@/modules/warehouse/aisle/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchStores } from "@/modules/warehouse/store/hooks";
import { useFetchZones } from "@/modules/warehouse/zone/hooks";
import UIAisleForm from "@/modules/warehouse/aisle/components/UIAisleForm";
import { Toaster } from "react-hot-toast";

export default function AisleCreate() {
  const { userId, userName } = useSessionUser();
  const { stores, loading: loadingStore } = useFetchStores();
  const { zones, loading: loadingZone } = useFetchZones();

  const zonesByStore = zones.reduce((acc, zone) => {
    if (!acc[zone.zoneStoreId]) acc[zone.zoneStoreId] = [];
    acc[zone.zoneStoreId].push(zone);
    return acc;
  }, {});

  const onSubmitHandler = useSubmitAisle({ mode: "create", userId });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        aisleStoreId: "",
        aisleZoneId: "",
        aisleCode: "",
        aisleName: "",
        aisleDescription: "",
      },
      onSubmitHandler
    );

  if (loadingStore || loadingZone) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIAisleForm
        headerContent="Aisle Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        stores={stores}
        zonesByStore={zonesByStore}
      />
    </>
  );
}
