"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";

export default function UIStoreForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  setFormData,
  isUpdate,
  operatedBy,
}) {
  const addZone = () => {
    const updated = [...(formData.storeZones || [])];
    updated.push({
      zoneId: undefined,
      zoneCode: "",
      zoneName: "",
      zoneDescription: "",
      zoneStatus: "Enable",
    });
    setFormData({ ...formData, storeZones: updated });
  };

  const updateZoneField = (index, field, value) => {
    const updated = [...formData.storeZones];
    updated[index][field] = value;
    setFormData({ ...formData, storeZones: updated });
  };

  const removeZone = (index) => {
    const updated = [...formData.storeZones];
    updated.splice(index, 1);
    setFormData({ ...formData, storeZones: updated });
  };

  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom overflow-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
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
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
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

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="storeLocation"
              label="Store Location"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.storeLocation || ""}
              onChange={handleInputChange("storeLocation")}
              isInvalid={!!errors.storeLocation}
              errorMessage={errors.storeLocation}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
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
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
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

        {formData.storeZones?.map((zone, index) => (
          <div
            key={index}
            className="flex flex-col w-full p-2 gap-2 border-2 border-danger border-dashed"
          >
            <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
              <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
                <Input
                  label="Zone Code"
                  labelPlacement="outside"
                  placeholder="Enter Zone Code"
                  variant="bordered"
                  color="default"
                  radius="full"
                  value={zone.zoneCode}
                  onChange={(e) =>
                    updateZoneField(index, "zoneCode", e.target.value)
                  }
                  isInvalid={!!errors.zones?.[index]?.zoneCode}
                  errorMessage={errors.zones?.[index]?.zoneCode}
                />
              </div>
              <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
                <Input
                  label="Zone Name"
                  labelPlacement="outside"
                  placeholder="Enter Zone Name"
                  variant="bordered"
                  color="default"
                  radius="full"
                  value={zone.zoneName}
                  onChange={(e) =>
                    updateZoneField(index, "zoneName", e.target.value)
                  }
                  isInvalid={!!errors.zones?.[index]?.zoneName}
                  errorMessage={errors.zones?.[index]?.zoneName}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
              <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
                <Input
                  label="Zone Description"
                  labelPlacement="outside"
                  placeholder="Enter Zone Description"
                  variant="bordered"
                  color="default"
                  radius="full"
                  value={zone.zoneDescription}
                  onChange={(e) =>
                    updateZoneField(index, "zoneDescription", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
                <Select
                  label="Zone Status"
                  labelPlacement="outside"
                  placeholder="Please Select"
                  variant="bordered"
                  color="default"
                  radius="full"
                  selectedKeys={[zone.zoneStatus]}
                  onSelectionChange={(keys) =>
                    updateZoneField(index, "zoneStatus", [...keys][0])
                  }
                >
                  <SelectItem key="Enable">Enable</SelectItem>
                  <SelectItem key="Disable">Disable</SelectItem>
                </Select>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2 border_custom">
              <div className="flex items-center justify-center h-full p-2 gap-2 border_custom">
                <Button
                  type="button"
                  color="danger"
                  radius="full"
                  className="w-full h-full p-3 gap-2 border_custom"
                  onPress={() => removeZone(index)}
                >
                  Remove Zone
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center h-full p-2 gap-2 border_custom">
            <Button
              type="button"
              color="secondary"
              radius="full"
              className="w-full h-full p-3 gap-2 border_custom"
              onPress={addZone}
            >
              Add Zone
            </Button>
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
              radius="full"
              isReadOnly
              value={operatedBy}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center h-full p-2 gap-2 border_custom">
            <Button
              type="submit"
              color="primary"
              radius="full"
              className="w-full h-full p-3 gap-2 border_custom"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
