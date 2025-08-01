"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import {
  useFetchRackById,
  useSubmitRack,
} from "@/modules/warehouse/rack/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchStores } from "@/modules/warehouse/store/hooks";
import { useFetchZones } from "@/modules/warehouse/zone/hooks";
import { useFetchAisles } from "@/modules/warehouse/aisle/hooks";
import UIRackForm from "@/modules/warehouse/rack/components/UIRackForm";
import { Toaster } from "react-hot-toast";

export default function RackUpdate() {
  const { rackId } = useParams();
  const { userId, userName } = useSessionUser();
  const { stores, loading: loadingStore } = useFetchStores();
  const { zones, loading: loadingZone } = useFetchZones();
  const { aisles, loading: loadingAisle } = useFetchAisles();
  const { rack, loading: loadingRack } = useFetchRackById(rackId);

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

  const onSubmitHandler = useSubmitRack({
    mode: "update",
    rackId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        rackStoreId: "",
        rackZoneId: "",
        rackAisleId: "",
        rackCode: "",
        rackName: "",
        rackDescription: "",
        rackStatus: "",
      },
      onSubmitHandler
    );

  useEffect(() => {
    if (rack) setFormData(rack);
  }, [rack, setFormData]);

  if (loadingStore || loadingZone || loadingAisle || loadingRack)
    return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIRackForm
        headerContent="Rack Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        isUpdate
        stores={stores}
        zonesByStore={zonesByStore}
        aisleByStoreByZone={aisleByStoreByZone}
      />
    </>
  );
}
