"use client";

import { Input, Button } from "@heroui/react";

export default function UIChangePasswordForm({
  formData,
  onChange,
  onSubmit,
  errors,
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
      <Input
        type="password"
        name="currentPassword"
        label="Current Password"
        labelPlacement="outside"
        value={formData.currentPassword}
        onChange={onChange("currentPassword")}
        isInvalid={!!errors.currentPassword}
        errorMessage={errors.currentPassword}
        variant="bordered"
        radius="full"
      />
      <Input
        type="password"
        name="newPassword"
        label="New Password"
        labelPlacement="outside"
        value={formData.newPassword}
        onChange={onChange("newPassword")}
        isInvalid={!!errors.newPassword}
        errorMessage={errors.newPassword}
        variant="bordered"
        radius="full"
      />
      <Input
        type="password"
        name="confirmNewPassword"
        label="Confirm New Password"
        labelPlacement="outside"
        value={formData.confirmNewPassword}
        onChange={onChange("confirmNewPassword")}
        isInvalid={!!errors.confirmNewPassword}
        errorMessage={errors.confirmNewPassword}
        variant="bordered"
        radius="full"
      />
      <Button type="submit" color="primary" radius="full">
        Change Password
      </Button>
    </form>
  );
}
