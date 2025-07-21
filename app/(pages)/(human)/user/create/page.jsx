"use client";

import { useState } from "react";
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

  const [previewImage, setPreviewImage] = useState("");

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

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        userFirstName: "",
        userLastName: "",
        userPhone: "",
        userEmail: "",
        userPicture: "",
        useJobDivisionId: "",
        useJobDepartmentId: "",
        useJobPositionId: "",
        useJobRoleId: "",
        useJobStartDate: "",
        useJobContractType: "",
      },
      onSubmitHandler
    );

  const handleChangeWithPreview = (name) => (e) => {
    const file = e?.target?.files?.[0];
    if (name === "userPicture" && file instanceof File) {
      setFormData((prev) => ({ ...prev, [name]: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      handleChange(name)(e);
    }
  };

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
        handleInputChange={handleChangeWithPreview}
        previewImage={previewImage}
        operatedBy={userName}
        divisions={divisions}
        departmentsByDivision={departmentsByDivision}
        positionsByDepartment={positionsByDepartment}
        roles={roles}
      />
    </>
  );
}
