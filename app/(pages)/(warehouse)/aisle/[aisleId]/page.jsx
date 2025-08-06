"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import {
  useFetchAisleById,
  useSubmitAisle,
} from "@/modules/warehouse/aisle/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchStores } from "@/modules/warehouse/store/hooks";
import { useFetchZones } from "@/modules/warehouse/zone/hooks";
import UIAisleForm from "@/modules/warehouse/aisle/components/UIAisleForm";
import { Toaster } from "react-hot-toast";

export default function AisleUpdate() {
  const { aisleId } = useParams();
  const { userId, userName } = useSessionUser();
  const { stores, loading: loadingStore } = useFetchStores();
  const { zones, loading: loadingZone } = useFetchZones();
  const { aisle, loading: loadingAisle } = useFetchAisleById(aisleId);

  const zonesByStore = zones.reduce((acc, zone) => {
    if (!acc[zone.zoneStoreId]) acc[zone.zoneStoreId] = [];
    acc[zone.zoneStoreId].push(zone);
    return acc;
  }, {});

  const onSubmitHandler = useSubmitAisle({
    mode: "update",
    aisleId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        aisleStoreId: "",
        aisleZoneId: "",
        aisleCode: "",
        aisleName: "",
        aisleDescription: "",
        aislePosX: "",
        aislePosY: "",
        aisleStatus: "",
      },
      onSubmitHandler
    );

  useEffect(() => {
    if (aisle) setFormData(aisle);
  }, [aisle, setFormData]);

  if (loadingStore || loadingZone || loadingAisle) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIAisleForm
        headerContent="Aisle Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        isUpdate
        stores={stores}
        zonesByStore={zonesByStore}
      />
    </>
  );
}
