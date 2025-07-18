"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import {
  useFetchPositionById,
  useSubmitPosition,
} from "@/modules/human/position/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchDivisions } from "@/modules/human/division/hooks";
import { useFetchDepartments } from "@/modules/human/department/hooks";
import UIPositionForm from "@/modules/human/position/components/UIPositionForm";
import { Toaster } from "react-hot-toast";

export default function PositionUpdate() {
  const { positionId } = useParams();
  const { userId, userName } = useSessionUser();
  const { divisions, loading: loadingDiv } = useFetchDivisions();
  const { departments, loading: loadingDept } = useFetchDepartments();
  const { position, loading: loadingDep } = useFetchPositionById(positionId);

  const departmentsByDivision = departments.reduce((acc, dep) => {
    if (!acc[dep.departmentDivisionId]) acc[dep.departmentDivisionId] = [];
    acc[dep.departmentDivisionId].push(dep);
    return acc;
  }, {});

  const onSubmitHandler = useSubmitPosition({
    mode: "update",
    positionId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler({ positionName: "", positionStatus: "" }, onSubmitHandler);

  useEffect(() => {
    if (position) setFormData(position);
  }, [position, setFormData]);

  if (loadingDiv || loadingDep) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIPositionForm
        headerContent="Position Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        isUpdate
        divisions={divisions}
        departmentsByDivision={departmentsByDivision}
      />
    </>
  );
}
