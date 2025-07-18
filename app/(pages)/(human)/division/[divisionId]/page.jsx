"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  useFetchDivisionById,
  useSubmitDivision,
} from "@/modules/human/division/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIDivisionForm from "@/modules/human/division/components/UIDivisionForm";
import { Toaster } from "react-hot-toast";

export default function DivisionUpdate() {
  const { divisionId } = useParams();
  const { userId, userName } = useSessionUser();
  const { division, loading } = useFetchDivisionById(divisionId);

  const onSubmitHandler = useSubmitDivision({
    mode: "update",
    divisionId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler({ divisionName: "", divisionStatus: "" }, onSubmitHandler);

  useEffect(() => {
    if (division) setFormData(division);
  }, [division, setFormData]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIDivisionForm
        headerContent="Division Update"
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
