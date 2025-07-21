"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";

export default function UIDepartmentForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
  divisions,
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
            <Select
              name="departmentDivisionId"
              label="Division"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="lg"
              isDisabled={isUpdate}
              selectedKeys={
                formData.departmentDivisionId
                  ? [String(formData.departmentDivisionId)]
                  : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("departmentDivisionId")([...keys][0])
              }
              isInvalid={!!errors.departmentDivisionId}
              errorMessage={errors.departmentDivisionId}
            >
              {divisions.map((div) => (
                <SelectItem key={div.divisionId}>{div.divisionName}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="departmentName"
              label="Department"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="lg"
              value={formData.departmentName || ""}
              onChange={handleInputChange("departmentName")}
              isInvalid={!!errors.departmentName}
              errorMessage={errors.departmentName}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
              <Select
                name="departmentStatus"
                label="Department Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="lg"
                selectedKeys={
                  formData.departmentStatus ? [formData.departmentStatus] : []
                }
                onSelectionChange={(keys) =>
                  handleInputChange("departmentStatus")([...keys][0])
                }
                isInvalid={!!errors.departmentStatus}
                errorMessage={errors.departmentStatus}
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
