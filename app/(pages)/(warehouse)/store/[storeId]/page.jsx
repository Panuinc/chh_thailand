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

  const onSubmitHandler = useSubmitStore({
    mode: "update",
    storeId,
    userId,
  });

  const {
    formRef,
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleNestedChange,
    handleSubmit,
  } = useFormHandler(
    {
      storeCode: "",
      storeName: "",
      storeDescription: "",
      storeStatus: "",
      storeZones: [],
    },
    onSubmitHandler
  );

  useEffect(() => {
    if (store) setFormData(structuredClone(store));
  }, [store, setFormData]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIStoreForm
        headerContent="Store Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        setErrors={setErrors}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleChange}
        handleNestedChange={handleNestedChange}
        operatedBy={userName}
        isUpdate
      />
    </>
  );
}
