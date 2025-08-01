"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import {
  useFetchZoneById,
  useSubmitZone,
} from "@/modules/warehouse/zone/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchStores } from "@/modules/warehouse/store/hooks";
import UIZoneForm from "@/modules/warehouse/zone/components/UIZoneForm";
import { Toaster } from "react-hot-toast";

export default function ZoneUpdate() {
  const { zoneId } = useParams();
  const { userId, userName } = useSessionUser();
  const { stores, loading: loadingDiv } = useFetchStores();
  const { zone, loading: loadingDep } = useFetchZoneById(zoneId);

  const onSubmitHandler = useSubmitZone({
    mode: "update",
    zoneId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        zoneStoreId: "",
        zoneCode: "",
        zoneName: "",
        zoneDescription: "",
        zoneStatus: "",
      },
      onSubmitHandler
    );

  useEffect(() => {
    if (zone) setFormData(zone);
  }, [zone, setFormData]);

  if (loadingDiv || loadingDep) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIZoneForm
        headerContent="Zone Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        isUpdate
        stores={stores}
      />
    </>
  );
}
