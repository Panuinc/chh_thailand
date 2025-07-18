"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitPosition } from "@/modules/human/position/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchDivisions } from "@/modules/human/division/hooks";
import UIPositionForm from "@/modules/human/position/components/UIPositionForm";
import { Toaster } from "react-hot-toast";

export default function PositionCreate() {
  const { userId, userName } = useSessionUser();
  const { divisions, loading } = useFetchDivisions();

  const onSubmitHandler = useSubmitPosition({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler(
      { positionDivisionId: "", positionDepartmentId: "", positionName: "" },
      onSubmitHandler
    );

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIPositionForm
        headerContent="Position Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        divisions={divisions}
      />
    </>
  );
}
