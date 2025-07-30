"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitPartner } from "@/modules/purchase/partner/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UIPartnerForm from "@/modules/purchase/partner/components/UIPartnerForm";
import { Toaster } from "react-hot-toast";

export default function PartnerCreate() {
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useSubmitPartner({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler({ partnerName: "" }, onSubmitHandler);

  return (
    <>
      <Toaster position="top-right" />
      <UIPartnerForm
        headerContent="Partner Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
      />
    </>
  );
}
