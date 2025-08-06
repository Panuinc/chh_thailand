"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";

export default function UIRackForm({
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
}) {
  const currentAisles =
    aisleByStoreByZone?.[formData.rackStoreId]?.[formData.rackZoneId] || [];

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
              name="rackStoreId"
              label="Store"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate}
              selectedKeys={
                formData.rackStoreId ? [String(formData.rackStoreId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("rackStoreId")([...keys][0])
              }
              isInvalid={!!errors.rackStoreId}
              errorMessage={errors.rackStoreId}
            >
              {stores.map((store) => (
                <SelectItem key={store.storeId}>{store.storeName}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="rackZoneId"
              label="Zone"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate || !formData.rackStoreId}
              selectedKeys={
                formData.rackZoneId ? [String(formData.rackZoneId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("rackZoneId")([...keys][0])
              }
              isInvalid={!!errors.rackZoneId}
              errorMessage={errors.rackZoneId}
            >
              {(zonesByStore[formData.rackStoreId] || []).map((zone) => (
                <SelectItem key={zone.zoneId}>{zone.zoneName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Select
            name="rackAisleId"
            label="Aisle"
            labelPlacement="outside"
            placeholder="Please Select"
            variant="bordered"
            color="default"
            radius="full"
            isDisabled={
              isUpdate || !formData.rackStoreId || !formData.rackZoneId
            }
            selectedKeys={
              formData.rackAisleId ? [String(formData.rackAisleId)] : []
            }
            onSelectionChange={(keys) =>
              handleInputChange("rackAisleId")([...keys][0])
            }
            isInvalid={!!errors.rackAisleId}
            errorMessage={errors.rackAisleId}
          >
            {currentAisles.map((aisle) => (
              <SelectItem key={aisle.aisleId}>{aisle.aisleName}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="rackCode"
              label="Rack Code"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.rackCode || ""}
              onChange={handleInputChange("rackCode")}
              isInvalid={!!errors.rackCode}
              errorMessage={errors.rackCode}
            />
          </div>
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              name="rackName"
              label="Rack Name"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.rackName || ""}
              onChange={handleInputChange("rackName")}
              isInvalid={!!errors.rackName}
              errorMessage={errors.rackName}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Textarea
              name="rackDescription"
              label="Rack Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.rackDescription || ""}
              onChange={handleInputChange("rackDescription")}
              isInvalid={!!errors.rackDescription}
              errorMessage={errors.rackDescription}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              type="number"
              name="rackPosX"
              label="Rack Pos X"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.rackPosX || ""}
              onChange={handleInputChange("rackPosX")}
              isInvalid={!!errors.rackPosX}
              errorMessage={errors.rackPosX}
            />
          </div>
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              type="number"
              name="rackPosY"
              label="Rack Pos Y"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.rackPosY || ""}
              onChange={handleInputChange("rackPosY")}
              isInvalid={!!errors.rackPosY}
              errorMessage={errors.rackPosY}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="rackStatus"
                label="Rack Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={formData.rackStatus ? [formData.rackStatus] : []}
                onSelectionChange={(keys) =>
                  handleInputChange("rackStatus")([...keys][0])
                }
                isInvalid={!!errors.rackStatus}
                errorMessage={errors.rackStatus}
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
