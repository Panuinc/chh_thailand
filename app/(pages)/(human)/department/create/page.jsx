"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDepartmentForm } from "@/modules/human/department/hooks";
import { useSessionUser } from "@/hooks/useSessionUser";
import { useFetchDivisions } from "@/modules/human/division/hooks";
import UIDepartmentForm from "@/modules/human/department/components/UIDepartmentForm";

export default function DepartmentCreate() {
  const router = useRouter();
  const { userId, userName } = useSessionUser();
  const { divisions, loading } = useFetchDivisions();

  const onSubmitHandler = useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      form.append("departmentCreateBy", userId);

      try {
        const res = await fetch("/api/human/department", {
          method: "POST",
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
          toast.error(result.error || "Failed to create department.");
        }
      } catch (err) {
        toast.error(`Failed to create department: ${err.message}`);
      }
    },
    [userId, router]
  );

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useDepartmentForm(
      { departmentDivisionId: "", departmentName: "" },
      onSubmitHandler
    );

  return (
    <>
      <Toaster position="top-right" />
      <UIDepartmentForm
        headerContent="Department Create"
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
