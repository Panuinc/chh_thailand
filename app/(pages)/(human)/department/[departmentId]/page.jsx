"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDepartmentForm } from "@/modules/human/department/hooks";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIDepartmentForm from "@/modules/human/department/components/UIDepartmentForm";

export default function DepartmentUpdate() {
  const router = useRouter();
  const { departmentId } = useParams();
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      form.append("departmentUpdateBy", userId);

      try {
        const res = await fetch(`/api/human/department/${departmentId}`, {
          method: "PUT",
          body: form,
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (res.ok) {
          toast.success(result.message);
          setTimeout(() => router.push("/department"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to update department.");
        }
      } catch (err) {
        toast.error(`Failed to update department: ${err.message}`);
      }
    },
    [departmentId, userId, router]
  );

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useDepartmentForm(
      { departmentDivisionId: "", departmentName: "", departmentStatus: "" },
      onSubmitHandler
    );

  useEffect(() => {
    if (!departmentId) return;

    (async () => {
      try {
        const res = await fetch(`/api/human/department/${departmentId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (res.ok && result.department?.length) {
          setFormData(result.department[0]);
        } else {
          toast.error(result.error || "Failed to load department.");
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      }
    })();
  }, [departmentId, setFormData]);

  return (
    <>
      <Toaster position="top-right" />
      <UIDepartmentForm
        headerContent="Department Update"
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
