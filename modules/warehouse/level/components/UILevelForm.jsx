"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";

export default function UILevelForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
  stores,
  zonesByStore,
  aisleByStoreByZone,
  rackByStoreByZoneByAisle,
}) {
  const currentAisles =
    aisleByStoreByZone?.[formData.levelStoreId]?.[formData.levelZoneId] || [];

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
              name="levelStoreId"
              label="Store"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate}
              selectedKeys={
                formData.levelStoreId ? [String(formData.levelStoreId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("levelStoreId")([...keys][0])
              }
              isInvalid={!!errors.levelStoreId}
              errorMessage={errors.levelStoreId}
            >
              {stores.map((store) => (
                <SelectItem key={store.storeId}>{store.storeName}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="levelZoneId"
              label="Zone"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate || !formData.levelStoreId}
              selectedKeys={
                formData.levelZoneId ? [String(formData.levelZoneId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("levelZoneId")([...keys][0])
              }
              isInvalid={!!errors.levelZoneId}
              errorMessage={errors.levelZoneId}
            >
              {(zonesByStore[formData.levelStoreId] || []).map((zone) => (
                <SelectItem key={zone.zoneId}>{zone.zoneName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="levelAisleId"
              label="Aisle"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={
                isUpdate || !formData.levelStoreId || !formData.levelZoneId
              }
              selectedKeys={
                formData.levelAisleId ? [String(formData.levelAisleId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("levelAisleId")([...keys][0])
              }
              isInvalid={!!errors.levelAisleId}
              errorMessage={errors.levelAisleId}
            >
              {currentAisles.map((aisle) => (
                <SelectItem key={aisle.aisleId}>{aisle.aisleName}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="levelRackId"
              label="Rack"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={
                isUpdate ||
                !formData.levelStoreId ||
                !formData.levelZoneId ||
                !formData.levelAisleId
              }
              selectedKeys={
                formData.levelRackId ? [String(formData.levelRackId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("levelRackId")([...keys][0])
              }
              isInvalid={!!errors.levelRackId}
              errorMessage={errors.levelRackId}
            >
              {(
                rackByStoreByZoneByAisle?.[formData.levelStoreId]?.[
                  formData.levelZoneId
                ]?.[formData.levelAisleId] || []
              ).map((rack) => (
                <SelectItem key={rack.rackId}>{rack.rackName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="levelCode"
              label="Level Code"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.levelCode || ""}
              onChange={handleInputChange("levelCode")}
              isInvalid={!!errors.levelCode}
              errorMessage={errors.levelCode}
            />
          </div>
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              name="levelName"
              label="Level Name"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.levelName || ""}
              onChange={handleInputChange("levelName")}
              isInvalid={!!errors.levelName}
              errorMessage={errors.levelName}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Textarea
              name="levelDescription"
              label="Level Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.levelDescription || ""}
              onChange={handleInputChange("levelDescription")}
              isInvalid={!!errors.levelDescription}
              errorMessage={errors.levelDescription}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="levelStatus"
                label="Level Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={
                  formData.levelStatus ? [formData.levelStatus] : []
                }
                onSelectionChange={(keys) =>
                  handleInputChange("levelStatus")([...keys][0])
                }
                isInvalid={!!errors.levelStatus}
                errorMessage={errors.levelStatus}
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
