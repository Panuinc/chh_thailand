"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import {
  useFetchPositionById,
  useSubmitPosition,
} from "@/modules/human/position/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchDivisions } from "@/modules/human/division/hooks";
import UIPositionForm from "@/modules/human/position/components/UIPositionForm";
import { Toaster } from "react-hot-toast";

export default function PositionUpdate() {
  const { positionId } = useParams();
  const { userId, userName } = useSessionUser();
  const { divisions, loading: loadingDiv } = useFetchDivisions();
  const { position, loading: loadingDep } =
    useFetchPositionById(positionId);

  const onSubmitHandler = useSubmitPosition({
    mode: "update",
    positionId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      { positionName: "", positionStatus: "" },
      onSubmitHandler
    );

  useEffect(() => {
    if (position) setFormData(position);
  }, [position, setFormData]);

  if (loadingDiv || loadingDep) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIPositionForm
        headerContent="Position Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        isUpdate
        divisions={divisions}
      />
    </>
  );
}
