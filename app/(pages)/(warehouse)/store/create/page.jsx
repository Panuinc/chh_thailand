"use client";

import { useRef } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitStore } from "@/modules/warehouse/store/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UIStoreForm from "@/modules/warehouse/store/components/UIStoreForm";
import { Toaster } from "react-hot-toast";

export default function StoreCreate() {
  const { userId, userName } = useSessionUser();
  const formRef = useRef();

  const onSubmitHandler = useSubmitStore({ mode: "create", userId });

  const {
    formRef: handlerFormRef,
    formData,
    errors,
    handleChange,
    handleSubmit,
    setFormData,
  } = useFormHandler(
    {
      storeCode: "",
      storeName: "",
      storeLocation: "",
      storeDescription: "",
      zones: [],
    },
    onSubmitHandler
  );

  return (
    <>
      <Toaster position="top-right" />
      <UIStoreForm
        headerContent="Store Create"
        formRef={handlerFormRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        setFormData={setFormData}
        operatedBy={userName}
      />
    </>
  );
}
