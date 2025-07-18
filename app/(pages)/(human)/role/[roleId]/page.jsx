"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  useRoleForm,
  useFetchRoleById,
  useSubmitRole,
} from "@/modules/human/role/hooks";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIRoleForm from "@/modules/human/role/components/UIRoleForm";
import { Toaster } from "react-hot-toast";

export default function RoleUpdate() {
  const { roleId } = useParams();
  const { userId, userName } = useSessionUser();
  const { role, loading } = useFetchRoleById(roleId);

  const onSubmitHandler = useSubmitRole({
    mode: "update",
    roleId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useRoleForm({ roleName: "", roleStatus: "" }, onSubmitHandler);

  useEffect(() => {
    if (role) setFormData(role);
  }, [role, setFormData]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIRoleForm
        headerContent="Role Update"
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
