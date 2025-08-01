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
import UIAisleForm from "@/modules/warehouse/aisle/components/UIAisleForm";
import { Toaster } from "react-hot-toast";

export default function AisleUpdate() {
  const { aisleId } = useParams();
  const { userId, userName } = useSessionUser();
  const { stores, loading: loadingDiv } = useFetchStores();
  const { aisle, loading: loadingDep } = useFetchAisleById(aisleId);

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
        aisleStatus: "",
      },
      onSubmitHandler
    );

  useEffect(() => {
    if (aisle) setFormData(aisle);
  }, [aisle, setFormData]);

  if (loadingDiv || loadingDep) return <div>Loading...</div>;

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
      />
    </>
  );
}
