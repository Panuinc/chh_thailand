"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import {
  useDepartmentForm,
  useFetchDepartmentById,
  useSubmitDepartment,
} from "@/modules/human/department/hooks";
import { useFetchDivisions } from "@/modules/human/division/hooks";
import UIDepartmentForm from "@/modules/human/department/components/UIDepartmentForm";
import { Toaster } from "react-hot-toast";

export default function DepartmentUpdate() {
  const { departmentId } = useParams();
  const { userId, userName } = useSessionUser();
  const { divisions, loading: loadingDiv } = useFetchDivisions();
  const { department, loading: loadingDep } =
    useFetchDepartmentById(departmentId);

  const onSubmitHandler = useSubmitDepartment({
    mode: "update",
    departmentId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useDepartmentForm(
      { departmentName: "", departmentStatus: "" },
      onSubmitHandler
    );

  useEffect(() => {
    if (department) setFormData(department);
  }, [department, setFormData]);

  if (loadingDiv || loadingDep) return <div>Loading...</div>;

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
        divisions={divisions}
      />
    </>
  );
}
