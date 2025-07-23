"use client";

import { useEffect, useState } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import { useFetchUserById } from "@/modules/human/user/hooks";
import UIUserForm from "@/modules/human/user/components/UIUserForm";
import UIChangePasswordForm from "@/modules/setting/components/UIChangePasswordForm";
import { Toaster, toast } from "react-hot-toast";

export default function Setting() {
  const { userId, userName } = useSessionUser();
  const { user, loading } = useFetchUserById(userId);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name) => (e) => {
    const value = e.target?.value || e;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrors({ confirmNewPassword: "Passwords do not match" });
      return;
    }

    try {
      const res = await fetch("/api/setting/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
        },
        body: JSON.stringify({
          userId,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        toast.error(result.message || "Failed to change password");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

if (loading || !user) return <div>Loading...</div>;

return (
  <>
    <Toaster position="top-right" />
    <div className="flex flex-col gap-4 p-4">
      <UIUserForm
        headerContent="Your Profile"
        isUpdate
        formData={{ ...user, ...(user.job || {}) }}
        operatedBy={userName}
        formRef={{ current: null }}
        errors={{}}
        handleInputChange={() => {}}
        previewImage={
          user.userPicture
            ? `/${user.userPicture}`
            : "/default-avatar.png"
        }
        onSubmit={(e) => e.preventDefault()}
      />

      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-bold mb-2">Change Password</h2>
        <UIChangePasswordForm
          onChange={handleChange}
          onSubmit={handleSubmit}
          formData={formData}
          errors={errors}
        />
      </div>
    </div>
  </>
);
}
