"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFetchDoorById, useSubmitDoor } from "@/modules/production/door/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIDoorForm from "@/modules/production/door/components/UIDoorForm";
import { Toaster } from "react-hot-toast";

export default function DoorUpdate() {
  const { doorId } = useParams();
  const { userId, userName } = useSessionUser();
  const { door, loading } = useFetchDoorById(doorId);

  const onSubmitHandler = useSubmitDoor({
    mode: "update",
    doorId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler({ doorName: "", doorStatus: "" }, onSubmitHandler);

  useEffect(() => {
    if (door) setFormData(door);
  }, [door, setFormData]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIDoorForm
        headerContent="Door Update"
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
