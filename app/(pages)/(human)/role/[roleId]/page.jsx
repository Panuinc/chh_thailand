"use client";

import React, { useRef, useState } from "react";
import UIRoleForm from "@/modules/human/role/components/UIRoleForm";

export default function RoleUpdate() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    roleName: "",
    roleStatus: "Enable",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (valueOrEvent) => {
    const value =
      typeof valueOrEvent === "string"
        ? valueOrEvent
        : valueOrEvent?.target?.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit:", formData);
    // Validate and submit here...
  };

  return (
    <>
      <UIRoleForm
        headerContent="Role Update"
        formRef={formRef}
        onSubmit={onSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleInputChange}
        isUpdate={true}
        operatedBy="admin@demo.com"
      />
    </>
  );
}
