"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFetchPartnerById, useSubmitPartner } from "@/modules/purchase/partner/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIPartnerForm from "@/modules/purchase/partner/components/UIPartnerForm";
import { Toaster } from "react-hot-toast";

export default function PartnerUpdate() {
  const { partnerId } = useParams();
  const { userId, userName } = useSessionUser();
  const { partner, loading } = useFetchPartnerById(partnerId);

  const onSubmitHandler = useSubmitPartner({
    mode: "update",
    partnerId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler({ partnerName: "", partnerStatus: "" }, onSubmitHandler);

  useEffect(() => {
    if (partner) setFormData(partner);
  }, [partner, setFormData]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIPartnerForm
        headerContent="Partner Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        isUpdate
      />
    </>
  );
}
