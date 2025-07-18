"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useRoleForm, useSubmitRole } from "@/modules/human/role/hooks";
import UIRoleForm from "@/modules/human/role/components/UIRoleForm";
import { Toaster } from "react-hot-toast";

export default function RoleCreate() {
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useSubmitRole({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } = useRoleForm(
    { roleName: "" },
    onSubmitHandler
  );

  return (
    <>
      <Toaster position="top-right" />
      <UIRoleForm
        headerContent="Role Create"
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
