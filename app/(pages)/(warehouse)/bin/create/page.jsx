"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitBin } from "@/modules/warehouse/bin/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchStores } from "@/modules/warehouse/store/hooks";
import { useFetchZones } from "@/modules/warehouse/zone/hooks";
import { useFetchAisles } from "@/modules/warehouse/aisle/hooks";
import { useFetchRacks } from "@/modules/warehouse/rack/hooks";
import { useFetchLevels } from "@/modules/warehouse/level/hooks";
import UIBinForm from "@/modules/warehouse/bin/components/UIBinForm";
import { Toaster } from "react-hot-toast";

export default function BinCreate() {
  const { userId, userName } = useSessionUser();
  const { stores, loading: loadingStore } = useFetchStores();
  const { zones, loading: loadingZone } = useFetchZones();
  const { aisles, loading: loadingAisle } = useFetchAisles();
  const { racks, loading: loadingRack } = useFetchRacks();
  const { levels, loading: loadingLevel } = useFetchLevels();

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

  const levelByStoreByZoneByAisleByRack = levels.reduce((acc, level) => {
    if (!acc[level.levelStoreId]) acc[level.levelStoreId] = {};
    if (!acc[level.levelStoreId][level.levelZoneId])
      acc[level.levelStoreId][level.levelZoneId] = {};
    if (!acc[level.levelStoreId][level.levelZoneId][level.levelAisleId])
      acc[level.levelStoreId][level.levelZoneId][level.levelAisleId] = {};
    if (
      !acc[level.levelStoreId][level.levelZoneId][level.levelAisleId][
        level.levelRackId
      ]
    )
      acc[level.levelStoreId][level.levelZoneId][level.levelAisleId][
        level.levelRackId
      ] = [];

    acc[level.levelStoreId][level.levelZoneId][level.levelAisleId][
      level.levelRackId
    ].push(level);
    return acc;
  }, {});

  const onSubmitHandler = useSubmitBin({ mode: "create", userId });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        binStoreId: "",
        binZoneId: "",
        binAisleId: "",
        binRackId: "",
        binLevelId: "",
        binCode: "",
        binName: "",
        binDescription: "",
        binRow: "",
        binType: "",
        binUsage: "",
        binCapacity: 0,
        binRfidTagId: "",
        binOccupancy: "",
        binFillRate: 0,
        binPosX: 0,
        binPosY: 0,
        binPosZ: 0,
        binRotationX: 0,
        binRotationY: 0,
        binRotationZ: 0,
        binWidth: 0,
        binHeight: 0,
        binDepth: 0,
      },
      onSubmitHandler
    );

  if (
    loadingStore ||
    loadingZone ||
    loadingAisle ||
    loadingRack ||
    loadingLevel
  )
    return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIBinForm
        headerContent="Bin Create"
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
        levelByStoreByZoneByAisleByRack={levelByStoreByZoneByAisleByRack}
      />
    </>
  );
}
