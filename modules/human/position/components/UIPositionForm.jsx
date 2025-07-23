"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";

export default function UIPositionForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
  divisions,
  departmentsByDivision,
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
            <Select
              name="positionDivisionId"
              label="Division"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate}
              selectedKeys={
                formData.positionDivisionId
                  ? [String(formData.positionDivisionId)]
                  : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("positionDivisionId")([...keys][0])
              }
              isInvalid={!!errors.positionDivisionId}
              errorMessage={errors.positionDivisionId}
            >
              {divisions.map((div) => (
                <SelectItem key={div.divisionId}>{div.divisionName}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="positionDepartmentId"
              label="Department"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate || !formData.positionDivisionId}
              selectedKeys={
                formData.positionDepartmentId
                  ? [String(formData.positionDepartmentId)]
                  : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("positionDepartmentId")([...keys][0])
              }
              isInvalid={!!errors.positionDepartmentId}
              errorMessage={errors.positionDepartmentId}
            >
              {(departmentsByDivision[formData.positionDivisionId] || []).map(
                (dep) => (
                  <SelectItem key={dep.departmentId}>
                    {dep.departmentName}
                  </SelectItem>
                )
              )}
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="positionName"
              label="Position"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.positionName || ""}
              onChange={handleInputChange("positionName")}
              isInvalid={!!errors.positionName}
              errorMessage={errors.positionName}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="positionStatus"
                label="Position Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={
                  formData.positionStatus ? [formData.positionStatus] : []
                }
                onSelectionChange={(keys) =>
                  handleInputChange("positionStatus")([...keys][0])
                }
                isInvalid={!!errors.positionStatus}
                errorMessage={errors.positionStatus}
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
          <div className="flex items-center justify-end h-full p-2 gap-2">
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
