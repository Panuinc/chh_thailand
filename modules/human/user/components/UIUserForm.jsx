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
  divisions = [],
  departmentsByDivision = {},
  positionsByDepartment = {},
  roles = [],
  previewImage,
}) {
  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom rounded-lg overflow-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom bg-default">
          <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold border_custom">
            User personal
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border_custom">
            {formData.userPicture && previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
            )}
            <Input
              type="file"
              name="userPicture"
              label="Picture"
              labelPlacement="outside"
              placeholder="Please Upload"
              variant="bordered"
              color="default"
              radius="lg"
              onChange={handleInputChange("userPicture")}
              isInvalid={!!errors.userPicture}
              errorMessage={errors.userPicture}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="userFirstName"
              label="Firstname"
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
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="userLastName"
              label="Lastname"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="lg"
              value={formData.userLastName || ""}
              onChange={handleInputChange("userLastName")}
              isInvalid={!!errors.userLastName}
              errorMessage={errors.userLastName}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              type="number"
              name="userPhone"
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="lg"
              value={formData.userPhone || ""}
              onChange={handleInputChange("userPhone")}
              isInvalid={!!errors.userPhone}
              errorMessage={errors.userPhone}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              type="email"
              name="userEmail"
              label="Email"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="lg"
              value={formData.userEmail || ""}
              onChange={handleInputChange("userEmail")}
              isInvalid={!!errors.userEmail}
              errorMessage={errors.userEmail}
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
                selectedKeys={formData.userStatus ? [formData.userStatus] : []}
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
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom bg-default">
          <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold border_custom">
            User Employment
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Select
              name="useJobDivisionId"
              label="Division"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="lg"
              selectedKeys={
                formData.useJobDivisionId
                  ? [String(formData.useJobDivisionId)]
                  : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("useJobDivisionId")([...keys][0])
              }
              isInvalid={!!errors.useJobDivisionId}
              errorMessage={errors.useJobDivisionId}
            >
              {divisions.map((div) => (
                <SelectItem key={div.divisionId}>{div.divisionName}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Select
              name="useJobDepartmentId"
              label="Department"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="lg"
              isDisabled={!formData.useJobDivisionId}
              selectedKeys={
                formData.useJobDepartmentId
                  ? [String(formData.useJobDepartmentId)]
                  : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("useJobDepartmentId")([...keys][0])
              }
              isInvalid={!!errors.useJobDepartmentId}
              errorMessage={errors.useJobDepartmentId}
            >
              {(departmentsByDivision[formData.useJobDivisionId] || []).map(
                (dep) => (
                  <SelectItem key={dep.departmentId}>
                    {dep.departmentName}
                  </SelectItem>
                )
              )}
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Select
              name="useJobPositionId"
              label="Position"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="lg"
              isDisabled={
                !formData.useJobDivisionId && !formData.useJobDepartmentId
              }
              selectedKeys={
                formData.useJobPositionId
                  ? [String(formData.useJobPositionId)]
                  : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("useJobPositionId")([...keys][0])
              }
              isInvalid={!!errors.useJobPositionId}
              errorMessage={errors.useJobPositionId}
            >
              {(positionsByDepartment[formData.useJobDepartmentId] || []).map(
                (pos) => (
                  <SelectItem key={pos.positionId}>
                    {pos.positionName}
                  </SelectItem>
                )
              )}
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Select
              name="useJobRoleId"
              label="Role"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="lg"
              selectedKeys={
                formData.useJobRoleId ? [String(formData.useJobRoleId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("useJobRoleId")([...keys][0])
              }
              isInvalid={!!errors.useJobRoleId}
              errorMessage={errors.useJobRoleId}
            >
              {roles.map((role) => (
                <SelectItem key={role.roleId}>{role.roleName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              type="date"
              name="useJobStartDate"
              label="Start Date"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="lg"
              value={formData.useJobStartDate || ""}
              onChange={handleInputChange("useJobStartDate")}
              isInvalid={!!errors.useJobStartDate}
              errorMessage={errors.useJobStartDate}
            />
          </div>
          {isUpdate && (
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
              <Input
                type="date"
                name="useJobEndDate"
                label="End Date"
                labelPlacement="outside"
                placeholder="Please Enter Data"
                variant="bordered"
                color="default"
                radius="lg"
                value={formData.useJobEndDate || ""}
                onChange={handleInputChange("useJobEndDate")}
                isInvalid={!!errors.useJobEndDate}
                errorMessage={errors.useJobEndDate}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Select
              name="useJobContractType"
              label="Contract Type"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="lg"
              selectedKeys={
                formData.useJobContractType ? [formData.useJobContractType] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("useJobContractType")([...keys][0])
              }
              isInvalid={!!errors.useJobContractType}
              errorMessage={errors.useJobContractType}
            >
              <SelectItem key="FullTime">FullTime</SelectItem>
              <SelectItem key="PartTime">PartTime</SelectItem>
              <SelectItem key="Internship">Internship</SelectItem>
              <SelectItem key="Temporary">Temporary</SelectItem>
              <SelectItem key="Freelance">Freelance</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2 border_custom">
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
