"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitDepartment } from "@/modules/human/department/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchDivisions } from "@/modules/human/division/hooks";
import UIDepartmentForm from "@/modules/human/department/components/UIDepartmentForm";
import { Toaster } from "react-hot-toast";

export default function DepartmentCreate() {
  const { userId, userName } = useSessionUser();
  const { divisions, loading } = useFetchDivisions();

  const onSubmitHandler = useSubmitDepartment({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } =
    useFormHandler(
      { departmentDivisionId: "", departmentName: "" },
      onSubmitHandler
    );

  if (loading) return <div>Loading...</div>;

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
