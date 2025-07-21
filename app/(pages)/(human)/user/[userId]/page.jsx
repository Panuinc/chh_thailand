"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFetchUserById, useSubmitUser } from "@/modules/human/user/hooks";
import { useSessionUser } from "@/hooks/useSessionUser";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchDivisions } from "@/modules/human/division/hooks";
import { useFetchDepartments } from "@/modules/human/department/hooks";
import { useFetchPositions } from "@/modules/human/position/hooks";
import { useFetchRoles } from "@/modules/human/role/hooks";
import UIUserForm from "@/modules/human/user/components/UIUserForm";
import { Toaster } from "react-hot-toast";

export default function UserUpdate() {
  const { userId: paramUserId } = useParams();
  const { userId, userName } = useSessionUser();
  const { user, loading } = useFetchUserById(paramUserId);

  const { divisions } = useFetchDivisions();
  const { departments } = useFetchDepartments();
  const { positions } = useFetchPositions();
  const { roles } = useFetchRoles();

  const departmentsByDivision = departments.reduce((acc, dep) => {
    if (!acc[dep.departmentDivisionId]) acc[dep.departmentDivisionId] = [];
    acc[dep.departmentDivisionId].push(dep);
    return acc;
  }, {});

  const positionsByDepartment = positions.reduce((acc, pos) => {
    if (!acc[pos.positionDepartmentId]) acc[pos.positionDepartmentId] = [];
    acc[pos.positionDepartmentId].push(pos);
    return acc;
  }, {});

  const onSubmitHandler = useSubmitUser({
    mode: "update",
    userId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        userFirstName: "",
        userLastName: "",
        userPhone: "",
        userEmail: "",
        useJobDivisionId: "",
        useJobDepartmentId: "",
        useJobPositionId: "",
        useJobRoleId: "",
        useJobStartDate: "",
        useJobEndDate: "",
        useJobContractType: "",
        userStatus: "",
      },
      onSubmitHandler
    );

  useEffect(() => {
    if (user) setFormData(user);
  }, [user, setFormData]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIUserForm
        headerContent="User Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        isUpdate
        divisions={divisions}
        departmentsByDivision={departmentsByDivision}
        positionsByDepartment={positionsByDepartment}
        roles={roles}
      />
    </>
  );
}
