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
        storeCode: "",
        storeName: "",
        storeLocation: "",
        storeDescription: "",
        storeZones: [],
      },
      onSubmitHandler
    );

  const handleNestedChange = (path, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const parts = path.split(".");
      let current = newData;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          if (part.match(/^\d+$/)) {
            const index = parseInt(part);
            if (!Array.isArray(current)) current = [];
            while (current.length <= index) current.push({});
          } else {
            current[part] = {};
          }
        }
        current = current[part];
      }

      current[parts[parts.length - 1]] = value;
      return newData;
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <UIStoreForm
        headerContent="Store Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={(e) => {
          if (e.target.name.includes(".")) {
            handleNestedChange(e.target.name, e.target.value);
          } else {
            handleChange(e);
          }
        }}
        setFormData={setFormData}
        operatedBy={userName}
        onNestedChange={handleNestedChange}
      />
    </>
  );
}
