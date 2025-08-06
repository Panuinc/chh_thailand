"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";

export default function UIZoneForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
  stores,
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
              name="zoneStoreId"
              label="Store"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate}
              selectedKeys={
                formData.zoneStoreId ? [String(formData.zoneStoreId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("zoneStoreId")([...keys][0])
              }
              isInvalid={!!errors.zoneStoreId}
              errorMessage={errors.zoneStoreId}
            >
              {stores.map((div) => (
                <SelectItem key={div.storeId}>{div.storeName}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="zoneCode"
              label="Zone Code"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.zoneCode || ""}
              onChange={handleInputChange("zoneCode")}
              isInvalid={!!errors.zoneCode}
              errorMessage={errors.zoneCode}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              name="zoneName"
              label="Zone Name"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.zoneName || ""}
              onChange={handleInputChange("zoneName")}
              isInvalid={!!errors.zoneName}
              errorMessage={errors.zoneName}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Textarea
              name="zoneDescription"
              label="Zone Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.zoneDescription || ""}
              onChange={handleInputChange("zoneDescription")}
              isInvalid={!!errors.zoneDescription}
              errorMessage={errors.zoneDescription}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              type="number"
              name="zonePosX"
              label="Zone Pos X"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.zonePosX || ""}
              onChange={handleInputChange("zonePosX")}
              isInvalid={!!errors.zonePosX}
              errorMessage={errors.zonePosX}
            />
          </div>
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              type="number"
              name="zonePosY"
              label="Zone Pos Y"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.zonePosY || ""}
              onChange={handleInputChange("zonePosY")}
              isInvalid={!!errors.zonePosY}
              errorMessage={errors.zonePosY}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="zoneStatus"
                label="Zone Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={formData.zoneStatus ? [formData.zoneStatus] : []}
                onSelectionChange={(keys) =>
                  handleInputChange("zoneStatus")([...keys][0])
                }
                isInvalid={!!errors.zoneStatus}
                errorMessage={errors.zoneStatus}
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
