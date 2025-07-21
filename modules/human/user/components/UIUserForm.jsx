"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";

export default function UIUserForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
}) {
  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom rounded-lg overflow-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold border_custom">
            User personal
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="userFirstName"
              label="User"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="lg"
              value={formData.userFirstName || ""}
              onChange={handleInputChange("userFirstName")}
              isInvalid={!!errors.userFirstName}
              errorMessage={errors.userFirstName}
            />
          </div>
        </div>
        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
              <Select
                name="userStatus"
                label="User Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="lg"
                selectedKeys={
                  formData.userStatus ? [formData.userStatus] : []
                }
                onSelectionChange={(keys) =>
                  handleInputChange("userStatus")([...keys][0])
                }
                isInvalid={!!errors.userStatus}
                errorMessage={errors.userStatus}
              >
                <SelectItem key="Enable">Enable</SelectItem>
                <SelectItem key="Disable">Disable</SelectItem>
              </Select>
            </div>
          </div>
        )}
        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full lg:w-4/12 p-2 gap-2 border_custom">
            <Input
              name="operatedBy"
              type="text"
              label="Operated By"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="flat"
              color="default"
              radius="lg"
              isReadOnly
              value={operatedBy}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-end h-full p-2 gap-2 border_custom">
            <Button
              type="submit"
              color="primary"
              radius="lg"
              className="w-full p-4 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
