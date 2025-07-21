"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  useFetchUserById,
  useSubmitUser,
} from "@/modules/human/user/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIUserForm from "@/modules/human/user/components/UIUserForm";
import { Toaster } from "react-hot-toast";

export default function UserUpdate() {
  const { usersId } = useParams();
  const { userId, userName } = useSessionUser();
  const { user, loading } = useFetchUserById(usersId);

  const onSubmitHandler = useSubmitUser({
    mode: "update",
    usersId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler({ userName: "", userStatus: "" }, onSubmitHandler);

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
      />
    </>
  );
}
