"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitDoor } from "@/modules/production/door/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UIDoorForm from "@/modules/production/door/components/UIDoorForm";
import { Toaster } from "react-hot-toast";

export default function DoorCreate() {
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useSubmitDoor({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler({ doorName: "" }, onSubmitHandler);

  return (
    <>
      <Toaster position="top-right" />
      <UIDoorForm
        headerContent="Door Create"
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
