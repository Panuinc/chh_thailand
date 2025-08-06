"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitRack } from "@/modules/warehouse/rack/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchStores } from "@/modules/warehouse/store/hooks";
import { useFetchZones } from "@/modules/warehouse/zone/hooks";
import { useFetchAisles } from "@/modules/warehouse/aisle/hooks";
import UIRackForm from "@/modules/warehouse/rack/components/UIRackForm";
import { Toaster } from "react-hot-toast";

export default function RackCreate() {
  const { userId, userName } = useSessionUser();
  const { stores, loading: loadingStore } = useFetchStores();
  const { zones, loading: loadingZone } = useFetchZones();
  const { aisles, loading: loadingAisle } = useFetchAisles();

  const zonesByStore = zones.reduce((acc, zone) => {
    if (!acc[zone.zoneStoreId]) acc[zone.zoneStoreId] = [];
    acc[zone.zoneStoreId].push(zone);
    return acc;
  }, {});

  const aisleByStoreByZone = aisles.reduce((acc, aisle) => {
    if (!acc[aisle.aisleStoreId]) acc[aisle.aisleStoreId] = {};
    if (!acc[aisle.aisleStoreId][aisle.aisleZoneId])
      acc[aisle.aisleStoreId][aisle.aisleZoneId] = [];
    acc[aisle.aisleStoreId][aisle.aisleZoneId].push(aisle);
    return acc;
  }, {});

  const onSubmitHandler = useSubmitRack({ mode: "create", userId });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        rackStoreId: "",
        rackZoneId: "",
        rackAisleId: "",
        rackCode: "",
        rackName: "",
        rackDescription: "",
        rackPosX: "",
        rackPosY: "",
      },
      onSubmitHandler
    );

  if (loadingStore || loadingZone || loadingAisle) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIRackForm
        headerContent="Rack Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        stores={stores}
        zonesByStore={zonesByStore}
        aisleByStoreByZone={aisleByStoreByZone}
      />
    </>
  );
}
