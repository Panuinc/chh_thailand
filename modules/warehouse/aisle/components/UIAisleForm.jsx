"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";

export default function UIAisleForm({
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
              name="aisleStoreId"
              label="Store"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate}
              selectedKeys={
                formData.aisleStoreId ? [String(formData.aisleStoreId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("aisleStoreId")([...keys][0])
              }
              isInvalid={!!errors.aisleStoreId}
              errorMessage={errors.aisleStoreId}
            >
              {stores.map((store) => (
                <SelectItem key={store.storeId}>{store.storeName}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="aisleZoneId"
              label="Zone"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate || !formData.aisleStoreId}
              selectedKeys={
                formData.aisleZoneId ? [String(formData.aisleZoneId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("aisleZoneId")([...keys][0])
              }
              isInvalid={!!errors.aisleZoneId}
              errorMessage={errors.aisleZoneId}
            >
              {(zonesByStore[formData.aisleStoreId] || []).map((zone) => (
                <SelectItem key={zone.zoneId}>{zone.zoneName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="aisleCode"
              label="Aisle Code"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.aisleCode || ""}
              onChange={handleInputChange("aisleCode")}
              isInvalid={!!errors.aisleCode}
              errorMessage={errors.aisleCode}
            />
          </div>
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              name="aisleName"
              label="Aisle Name"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.aisleName || ""}
              onChange={handleInputChange("aisleName")}
              isInvalid={!!errors.aisleName}
              errorMessage={errors.aisleName}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Textarea
              name="aisleDescription"
              label="Aisle Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.aisleDescription || ""}
              onChange={handleInputChange("aisleDescription")}
              isInvalid={!!errors.aisleDescription}
              errorMessage={errors.aisleDescription}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="aisleStatus"
                label="Aisle Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={
                  formData.aisleStatus ? [formData.aisleStatus] : []
                }
                onSelectionChange={(keys) =>
                  handleInputChange("aisleStatus")([...keys][0])
                }
                isInvalid={!!errors.aisleStatus}
                errorMessage={errors.aisleStatus}
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
