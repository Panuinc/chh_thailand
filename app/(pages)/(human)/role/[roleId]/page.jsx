"use client";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useCallback } from "react";

import { useSessionUser, useRoleForm } from "@/modules/human/role/hooks";
import UIRoleForm from "@/modules/human/role/components/UIRoleForm";

export default function RoleUpdate() {
  const router = useRouter();
  const { roleId } = useParams();
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useCallback(async (formRef, formData, setErrors) => {
    const form = new FormData(formRef);
    form.append("roleUpdateBy", userId);
    try {
      const res = await fetch(`/api/human/role/${roleId}`, {
        method: "PUT",
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
        toast.error(result.error || "Failed to update role.");
      }
    } catch (err) {
      toast.error(`Failed to update role: ${err.message}`);
    }
  }, [roleId, userId, router]);

  const {
    formRef,
    formData,
    setFormData,
    errors,
    handleChange,
    handleSubmit,
  } = useRoleForm({ roleName: "", roleStatus: "" }, onSubmitHandler);

  useEffect(() => {
    if (!roleId) return;
    (async () => {
      try {
        const res = await fetch(`/api/human/role/${roleId}`, {
          headers: { "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "" },
        });
        const result = await res.json();
        if (res.ok && result.role?.length) {
          setFormData(result.role[0]);
        } else {
          toast.error(result.error || "Failed to load role.");
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      }
    })();
  }, [roleId, setFormData]);

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
