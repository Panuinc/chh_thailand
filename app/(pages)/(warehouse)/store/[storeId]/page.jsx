"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  useFetchStoreById,
  useSubmitStore,
} from "@/modules/warehouse/store/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIStoreForm from "@/modules/warehouse/store/components/UIStoreForm";
import { Toaster } from "react-hot-toast";

export default function StoreUpdate() {
  const { storeId } = useParams();
  const { userId, userName } = useSessionUser();
  const { store, loading } = useFetchStoreById(storeId);

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        storeCode: "",
        storeName: "",
        storeLocation: "",
        storeDescription: "",
        storeStatus: "",
        storeZones: [],
      },
      useSubmitStore({ mode: "update", storeId, userId })
    );

  useEffect(() => {
    if (store) {
      setFormData({
        storeCode: store.storeCode,
        storeName: store.storeName,
        storeLocation: store.storeLocation,
        storeDescription: store.storeDescription,
        storeStatus: store.storeStatus,
        storeZones: Array.isArray(store.storeZones)
          ? store.storeZones.map((zone) => ({
              zoneId: zone.zoneId,
              zoneCode: zone.zoneCode,
              zoneName: zone.zoneName,
              zoneDescription: zone.zoneDescription,
              zoneStatus: zone.zoneStatus,
            }))
          : [],
      });
    }
  }, [store]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIStoreForm
        headerContent="Store Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        setFormData={setFormData}
        operatedBy={userName}
        isUpdate
      />
    </>
  );
}
