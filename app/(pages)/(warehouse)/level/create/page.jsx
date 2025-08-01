"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitLevel } from "@/modules/warehouse/level/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchStores } from "@/modules/warehouse/store/hooks";
import { useFetchZones } from "@/modules/warehouse/zone/hooks";
import { useFetchAisles } from "@/modules/warehouse/aisle/hooks";
import { useFetchRacks } from "@/modules/warehouse/rack/hooks";
import UILevelForm from "@/modules/warehouse/level/components/UILevelForm";
import { Toaster } from "react-hot-toast";

export default function LevelCreate() {
  const { userId, userName } = useSessionUser();
  const { stores, loading: loadingStore } = useFetchStores();
  const { zones, loading: loadingZone } = useFetchZones();
  const { aisles, loading: loadingAisle } = useFetchAisles();
  const { racks, loading: loadingRack } = useFetchRacks();

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

  const rackByStoreByZoneByAisle = racks.reduce((acc, rack) => {
    if (!acc[rack.rackStoreId]) acc[rack.rackStoreId] = {};
    if (!acc[rack.rackStoreId][rack.rackZoneId])
      acc[rack.rackStoreId][rack.rackZoneId] = {};
    if (!acc[rack.rackStoreId][rack.rackZoneId][rack.rackAisleId])
      acc[rack.rackStoreId][rack.rackZoneId][rack.rackAisleId] = [];
    acc[rack.rackStoreId][rack.rackZoneId][rack.rackAisleId].push(rack);
    return acc;
  }, {});

  const onSubmitHandler = useSubmitLevel({ mode: "create", userId });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        levelStoreId: "",
        levelZoneId: "",
        levelAisleId: "",
        levelRackId: "",
        levelCode: "",
        levelName: "",
        levelDescription: "",
      },
      onSubmitHandler
    );

  if (loadingStore || loadingZone || loadingAisle || loadingRack)
    return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UILevelForm
        headerContent="Level Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        stores={stores}
        zonesByStore={zonesByStore}
        aisleByStoreByZone={aisleByStoreByZone}
        rackByStoreByZoneByAisle={rackByStoreByZoneByAisle}
      />
    </>
  );
}
