"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitDivision } from "@/modules/human/division/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UIDivisionForm from "@/modules/human/division/components/UIDivisionForm";
import { Toaster } from "react-hot-toast";

export default function DivisionCreate() {
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useSubmitDivision({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler({ divisionName: "" }, onSubmitHandler);

  return (
    <>
      <Toaster position="top-right" />
      <UIDivisionForm
        headerContent="Division Create"
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
