"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";

export default function UIDivisionForm({
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
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="divisionName"
              label="Division"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              value={formData.divisionName || ""}
              onChange={handleInputChange("divisionName")}
              isInvalid={!!errors.divisionName}
              errorMessage={errors.divisionName}
            />
          </div>
        </div>
        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
              <Select
                name="divisionStatus"
                label="Division Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                selectedKeys={formData.divisionStatus ? [formData.divisionStatus] : []}
                onSelectionChange={(keys) =>
                  handleInputChange("divisionStatus")([...keys][0])
                }
                isInvalid={!!errors.divisionStatus}
                errorMessage={errors.divisionStatus}
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
              isReadOnly
              value={operatedBy}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-end w-full h-full p-2 gap-2 border_custom">
            <Button
              type="submit"
              color="primary"
              className="flex items-center justify-center h-full p-3 gap-2 border_custom"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
