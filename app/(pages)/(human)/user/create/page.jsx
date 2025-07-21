"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitUser } from "@/modules/human/user/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UIUserForm from "@/modules/human/user/components/UIUserForm";
import { Toaster } from "react-hot-toast";

export default function UserCreate() {
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useSubmitUser({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler({ userName: "" }, onSubmitHandler);

  return (
    <>
      <Toaster position="top-right" />
      <UIUserForm
        headerContent="User Create"
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
