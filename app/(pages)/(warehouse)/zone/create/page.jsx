"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitZone } from "@/modules/warehouse/zone/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchStores } from "@/modules/warehouse/store/hooks";
import UIZoneForm from "@/modules/warehouse/zone/components/UIZoneForm";
import { Toaster } from "react-hot-toast";

export default function ZoneCreate() {
  const { userId, userName } = useSessionUser();
  const { stores, loading } = useFetchStores();

  const onSubmitHandler = useSubmitZone({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        zoneStoreId: "",
        zoneCode: "",
        zoneName: "",
        zoneDescription: "",
        zonePosX: "",
        zonePosY: "",
      },
      onSubmitHandler
    );

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIZoneForm
        headerContent="Zone Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        stores={stores}
      />
    </>
  );
}
