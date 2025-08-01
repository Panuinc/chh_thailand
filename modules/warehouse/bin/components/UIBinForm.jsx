"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";

export default function UIBinForm({
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
  levelByStoreByZoneByAisleByRack,
}) {
  const currentAisles =
    aisleByStoreByZone?.[formData.binStoreId]?.[formData.binZoneId] || [];

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
              name="binStoreId"
              label="Store"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate}
              selectedKeys={
                formData.binStoreId ? [String(formData.binStoreId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("binStoreId")([...keys][0])
              }
              isInvalid={!!errors.binStoreId}
              errorMessage={errors.binStoreId}
            >
              {stores.map((store) => (
                <SelectItem key={store.storeId}>{store.storeName}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="binZoneId"
              label="Zone"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={isUpdate || !formData.binStoreId}
              selectedKeys={
                formData.binZoneId ? [String(formData.binZoneId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("binZoneId")([...keys][0])
              }
              isInvalid={!!errors.binZoneId}
              errorMessage={errors.binZoneId}
            >
              {(zonesByStore[formData.binStoreId] || []).map((zone) => (
                <SelectItem key={zone.zoneId}>{zone.zoneName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="binAisleId"
              label="Aisle"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={
                isUpdate || !formData.binStoreId || !formData.binZoneId
              }
              selectedKeys={
                formData.binAisleId ? [String(formData.binAisleId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("binAisleId")([...keys][0])
              }
              isInvalid={!!errors.binAisleId}
              errorMessage={errors.binAisleId}
            >
              {currentAisles.map((aisle) => (
                <SelectItem key={aisle.aisleId}>{aisle.aisleName}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="binRackId"
              label="Rack"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={
                isUpdate ||
                !formData.binStoreId ||
                !formData.binZoneId ||
                !formData.binAisleId
              }
              selectedKeys={
                formData.binRackId ? [String(formData.binRackId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("binRackId")([...keys][0])
              }
              isInvalid={!!errors.binRackId}
              errorMessage={errors.binRackId}
            >
              {(
                rackByStoreByZoneByAisle?.[formData.binStoreId]?.[
                  formData.binZoneId
                ]?.[formData.binAisleId] || []
              ).map((rack) => (
                <SelectItem key={rack.rackId}>{rack.rackName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="binLevelId"
              label="Level"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              isDisabled={
                isUpdate ||
                !formData.binStoreId ||
                !formData.binZoneId ||
                !formData.binAisleId ||
                !formData.binRackId
              }
              selectedKeys={
                formData.binLevelId ? [String(formData.binLevelId)] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("binLevelId")([...keys][0])
              }
              isInvalid={!!errors.binLevelId}
              errorMessage={errors.binLevelId}
            >
              {(
                levelByStoreByZoneByAisleByRack?.[formData.binStoreId]?.[
                  formData.binZoneId
                ]?.[formData.binAisleId]?.[formData.binRackId] || []
              ).map((level) => (
                <SelectItem key={level.levelId}>{level.levelName}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binCode"
              label="Bin Code"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binCode || ""}
              onChange={handleInputChange("binCode")}
              isInvalid={!!errors.binCode}
              errorMessage={errors.binCode}
            />
          </div>
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Input
              name="binName"
              label="Bin Name"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binName || ""}
              onChange={handleInputChange("binName")}
              isInvalid={!!errors.binName}
              errorMessage={errors.binName}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Textarea
              name="binDescription"
              label="Bin Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binDescription || ""}
              onChange={handleInputChange("binDescription")}
              isInvalid={!!errors.binDescription}
              errorMessage={errors.binDescription}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binRow"
              label="Bin Row"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binRow || ""}
              onChange={handleInputChange("binRow")}
              isInvalid={!!errors.binRow}
              errorMessage={errors.binRow}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binType"
              label="Bin Type"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binType || ""}
              onChange={handleInputChange("binType")}
              isInvalid={!!errors.binType}
              errorMessage={errors.binType}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binUsage"
              label="Bin Usage"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binUsage || ""}
              onChange={handleInputChange("binUsage")}
              isInvalid={!!errors.binUsage}
              errorMessage={errors.binUsage}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binCapacity"
              label="Bin Capacity"
              type="number"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binCapacity || ""}
              onChange={handleInputChange("binCapacity")}
              isInvalid={!!errors.binCapacity}
              errorMessage={errors.binCapacity}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binRfidTagId"
              label="RFID Tag ID"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binRfidTagId || ""}
              onChange={handleInputChange("binRfidTagId")}
              isInvalid={!!errors.binRfidTagId}
              errorMessage={errors.binRfidTagId}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="binOccupancy"
              label="Occupancy"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              selectedKeys={
                formData.binOccupancy ? [formData.binOccupancy] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("binOccupancy")([...keys][0])
              }
              isInvalid={!!errors.binOccupancy}
              errorMessage={errors.binOccupancy}
            >
              <SelectItem key="Empty">Empty</SelectItem>
              <SelectItem key="Partial">Partial</SelectItem>
              <SelectItem key="Full">Full</SelectItem>
              <SelectItem key="Reserved">Reserved</SelectItem>
            </Select>
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binFillRate"
              label="Fill Rate (%)"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binFillRate || ""}
              onChange={handleInputChange("binFillRate")}
              isInvalid={!!errors.binFillRate}
              errorMessage={errors.binFillRate}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binPosX"
              label="X"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binPosX || ""}
              onChange={handleInputChange("binPosX")}
              isInvalid={!!errors.binPosX}
              errorMessage={errors.binPosX}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binPosY"
              label="Y"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binPosY || ""}
              onChange={handleInputChange("binPosY")}
              isInvalid={!!errors.binPosY}
              errorMessage={errors.binPosY}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binPosZ"
              label="Z"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binPosZ || ""}
              onChange={handleInputChange("binPosZ")}
              isInvalid={!!errors.binPosZ}
              errorMessage={errors.binPosZ}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binRotationX"
              label="Rotation X"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binRotationX || ""}
              onChange={handleInputChange("binRotationX")}
              isInvalid={!!errors.binRotationX}
              errorMessage={errors.binRotationX}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binRotationY"
              label="Rotation Y"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binRotationY || ""}
              onChange={handleInputChange("binRotationY")}
              isInvalid={!!errors.binRotationY}
              errorMessage={errors.binRotationY}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binRotationZ"
              label="Rotation Z"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binRotationZ || ""}
              onChange={handleInputChange("binRotationZ")}
              isInvalid={!!errors.binRotationZ}
              errorMessage={errors.binRotationZ}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binWidth"
              label="Width"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binWidth || ""}
              onChange={handleInputChange("binWidth")}
              isInvalid={!!errors.binWidth}
              errorMessage={errors.binWidth}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binHeight"
              label="Height"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binHeight || ""}
              onChange={handleInputChange("binHeight")}
              isInvalid={!!errors.binHeight}
              errorMessage={errors.binHeight}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="binDepth"
              label="Depth"
              type="number"
              labelPlacement="outside"
              placeholder="Enter"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.binDepth || ""}
              onChange={handleInputChange("binDepth")}
              isInvalid={!!errors.binDepth}
              errorMessage={errors.binDepth}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="binStatus"
                label="Bin Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={formData.binStatus ? [formData.binStatus] : []}
                onSelectionChange={(keys) =>
                  handleInputChange("binStatus")([...keys][0])
                }
                isInvalid={!!errors.binStatus}
                errorMessage={errors.binStatus}
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
