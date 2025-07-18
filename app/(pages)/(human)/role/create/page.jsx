"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRoleForm } from "@/modules/human/role/hooks";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIRoleForm from "@/modules/human/role/components/UIRoleForm";

export default function RoleCreate() {
  const router = useRouter();
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      form.append("roleCreateBy", userId);
      try {
        const res = await fetch("/api/human/role", {
          method: "POST",
          body: form,
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });
        const result = await res.json();
        if (res.ok) {
          toast.success(result.message);
          setTimeout(() => router.push("/role"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to create role.");
        }
      } catch (err) {
        toast.error(`Failed to create role: ${err.message}`);
      }
    },
    [userId, router]
  );

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
