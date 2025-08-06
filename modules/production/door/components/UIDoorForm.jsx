"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";

export default function UIDoorForm({
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
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 overflow-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
           <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="doorProjectName"
              label="Door"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.doorProjectName || ""}
              onChange={handleInputChange("doorProjectName")}
              isInvalid={!!errors.doorProjectName}
              errorMessage={errors.doorProjectName}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="doorProjectName"
              label="Door"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.doorProjectName || ""}
              onChange={handleInputChange("doorProjectName")}
              isInvalid={!!errors.doorProjectName}
              errorMessage={errors.doorProjectName}
            />
          </div>
        </div>
        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="doorStatus"
                label="Door Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={formData.doorStatus ? [formData.doorStatus] : []}
                onSelectionChange={(keys) =>
                  handleInputChange("doorStatus")([...keys][0])
                }
                isInvalid={!!errors.doorStatus}
                errorMessage={errors.doorStatus}
              >
                <SelectItem key="Enable">Enable</SelectItem>
                <SelectItem key="Disable">Disable</SelectItem>
              </Select>
            </div>
          </div>
        )}
        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
            <Input
              name="operatedBy"
              type="text"
              label="Operated By"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="flat"
              color="default"
              radius="full"
              isReadOnly
              value={operatedBy}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center h-full p-2 gap-2">
            <Button
              type="submit"
              color="primary"
              radius="full"
              className="w-full h-full p-3 gap-2"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
