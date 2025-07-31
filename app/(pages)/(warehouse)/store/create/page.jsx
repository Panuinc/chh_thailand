"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitStore } from "@/modules/warehouse/store/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UIStoreForm from "@/modules/warehouse/store/components/UIStoreForm";
import { Toaster } from "react-hot-toast";

export default function StoreCreate() {
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useSubmitStore({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit, setFormData } =
    useFormHandler(
      {
        storeTax: "",
        storeName: "",
        storeBranch: "",
        storeAddress: "",
        storePhone: "",
        storeType: "",
        storeLeaders: [],
      },
      onSubmitHandler
    );

  return (
    <>
      <Toaster position="top-right" />
      <UIStoreForm
        headerContent="Store Create"
        formRef={formRef}
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
