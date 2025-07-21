"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitUser } from "@/modules/human/user/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFetchDivisions } from "@/modules/human/division/hooks";
import { useFetchDepartments } from "@/modules/human/department/hooks";
import { useFetchPositions } from "@/modules/human/position/hooks";
import { useFetchRoles } from "@/modules/human/role/hooks";
import UIUserForm from "@/modules/human/user/components/UIUserForm";
import { Toaster } from "react-hot-toast";

export default function UserCreate() {
  const { userId, userName } = useSessionUser();

  const { divisions, loading } = useFetchDivisions();
  const { departments, loading: loadingDept } = useFetchDepartments();
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
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit } =
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
      },
      onSubmitHandler
    );

  if (loading || loadingDept) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIUserForm
        headerContent="User Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        divisions={divisions}
        departmentsByDivision={departmentsByDivision}
        positionsByDepartment={positionsByDepartment}
        roles={roles}
      />
    </>
  );
}
