"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem, Textarea } from "@heroui/react";

export default function UIStoreForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  setFormData,
  handleInputChange,
  handleNestedChange,
  isUpdate,
  operatedBy,
}) {
  const addNested = (path, newItem) => {
    setFormData((prev) => {
      const newData = structuredClone(prev);
      let target = newData;
      for (const key of path) {
        if (!target[key]) target[key] = [];
        target = target[key];
      }
      target.push(newItem);
      return newData;
    });
  };

  const deleteNested = (path, index) => {
    setFormData((prev) => {
      const newData = structuredClone(prev);
      let target = newData;
      for (const key of path) {
        if (!target[key]) return prev;
        target = target[key];
      }
      target.splice(index, 1);
      return newData;
    });
  };

  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={(e) => onSubmit(e, formData)}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 overflow-auto"
      >
        <div className="flex flex-col items-center justify-center w-full p-2 gap-2">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
              Store Information
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                name="storeCode"
                label="Store Code"
                labelPlacement="outside"
                placeholder="Please Enter Data"
                variant="bordered"
                color="default"
                radius="full"
                value={formData.storeCode || ""}
                onChange={handleInputChange("storeCode")}
                isInvalid={!!errors.storeCode}
                errorMessage={errors.storeCode}
              />
            </div>
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                name="storeName"
                label="Store Name"
                labelPlacement="outside"
                placeholder="Please Enter Data"
                variant="bordered"
                color="default"
                radius="full"
                value={formData.storeName || ""}
                onChange={handleInputChange("storeName")}
                isInvalid={!!errors.storeName}
                errorMessage={errors.storeName}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Textarea
                name="storeDescription"
                label="Store Description"
                labelPlacement="outside"
                placeholder="Please Enter Data"
                variant="bordered"
                color="default"
                radius="full"
                value={formData.storeDescription || ""}
                onChange={handleInputChange("storeDescription")}
                isInvalid={!!errors.storeDescription}
                errorMessage={errors.storeDescription}
              />
            </div>
          </div>

          {isUpdate && (
            <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
              <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
                <Select
                  name="storeStatus"
                  label="Store Status"
                  labelPlacement="outside"
                  placeholder="Please Select"
                  variant="bordered"
                  color="default"
                  radius="full"
                  selectedKeys={
                    formData.storeStatus ? [formData.storeStatus] : []
                  }
                  onSelectionChange={(keys) =>
                    handleInputChange("storeStatus")([...keys][0])
                  }
                  isInvalid={!!errors.storeStatus}
                  errorMessage={errors.storeStatus}
                >
                  <SelectItem key="Enable">Enable</SelectItem>
                  <SelectItem key="Disable">Disable</SelectItem>
                </Select>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-end justify-end w-full p-2 gap-2">
            <div className="flex items-center justify-center h-full p-2 gap-2">
              <Button
                onPress={() =>
                  addNested(["storeZones"], {
                    zoneCode: "",
                    zoneName: "",
                    zoneDescription: "",
                    zonePosX: "",
                    zonePosY: "",
                    zoneStatus: "",
                    // aisles: [],
                  })
                }
                color="warning"
                radius="full"
                className="w-full h-full p-3 gap-2"
              >
                + Zone
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start p-2 gap-2 w-full">
          {(formData.storeZones || []).map((zone, z) => (
            <div
              key={z}
              className="flex flex-col items-center justify-start w-full p-2 gap-2 border-2 border-default rounded-3xl"
            >
              <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                  Zone Information : {zone.zoneCode || `#${z + 1}`}
                </div>
                <div className="flex items-center justify-center h-full p-2 gap-2">
                  <Button
                    onPress={() => deleteNested(["storeZones"], z)}
                    color="danger"
                    radius="full"
                    className="w-full h-full p-3 gap-2"
                  >
                    🗑
                  </Button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    name={`zoneCode-${z}`}
                    label="Zone Code"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zoneCode || ""}
                    onChange={handleNestedChange(["storeZones", z], "zoneCode")}
                    isInvalid={!!errors.zoneCode}
                    errorMessage={errors.zoneCode}
                  />
                </div>
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    name={`zoneName-${z}`}
                    label="Zone Name"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zoneName || ""}
                    onChange={handleNestedChange(["storeZones", z], "zoneName")}
                    isInvalid={!!errors.zoneName}
                    errorMessage={errors.zoneName}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Textarea
                    name={`zoneDescription-${z}`}
                    label="Zone Description"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zoneDescription || ""}
                    onChange={handleNestedChange(
                      ["storeZones", z],
                      "zoneDescription"
                    )}
                    isInvalid={!!errors.zoneDescription}
                    errorMessage={errors.zoneDescription}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    type="number"
                    name={`zonePosX-${z}`}
                    label="Zone PosX"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zonePosX || ""}
                    onChange={handleNestedChange(["storeZones", z], "zonePosX")}
                    isInvalid={!!errors.zonePosX}
                    errorMessage={errors.zonePosX}
                  />
                </div>
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    type="number"
                    name={`zonePosY-${z}`}
                    label="Zone PosY"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zonePosY || ""}
                    onChange={handleNestedChange(["storeZones", z], "zonePosY")}
                    isInvalid={!!errors.zonePosY}
                    errorMessage={errors.zonePosY}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
                  <Select
                    name={`zoneStatus-${z}`}
                    label="Zone Status"
                    labelPlacement="outside"
                    placeholder="Please Select"
                    variant="bordered"
                    color="default"
                    radius="full"
                    selectedKeys={zone.zoneStatus ? [zone.zoneStatus] : []}
                    onSelectionChange={(keys) =>
                      handleNestedChange(
                        ["storeZones", z],
                        "zoneStatus"
                      )([...keys][0])
                    }
                    isInvalid={!!errors.zoneStatus}
                    errorMessage={errors.zoneStatus}
                  >
                    <SelectItem key="Enable">Enable</SelectItem>
                    <SelectItem key="Disable">Disable</SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
            <Input
              name="operatedBy"
              type="text"
              label="Operated By"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="flat"
              radius="full"
              isReadOnly
              value={operatedBy || ""}
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
