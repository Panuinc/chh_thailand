"use client";

import UITopic from "@/components/topic/UITopic";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";

export default function UIStoreForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
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
            <Input
              name="storeCode"
              label="Store Code"
              labelPlacement="outside"
              placeholder="ST001"
              variant="bordered"
              radius="full"
              value={formData.storeCode || ""}
              onChange={handleInputChange("storeCode")}
              isInvalid={!!errors.storeCode}
              errorMessage={errors.storeCode}
            />
            <Input
              name="storeName"
              label="Store Name"
              labelPlacement="outside"
              placeholder="Display name"
              variant="bordered"
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
            <Input
              name="storeLocation"
              label="Location"
              labelPlacement="outside"
              placeholder="Factory A, Bangkok"
              variant="bordered"
              radius="full"
              value={formData.storeLocation || ""}
              onChange={handleInputChange("storeLocation")}
              isInvalid={!!errors.storeLocation}
              errorMessage={errors.storeLocation}
            />
            <Textarea
              name="storeDescription"
              label="Description"
              labelPlacement="outside"
              placeholder="Optional"
              variant="bordered"
              radius="lg"
              className="w-full"
              value={formData.storeDescription || ""}
              onChange={handleInputChange("storeDescription")}
              isInvalid={!!errors.storeDescription}
              errorMessage={errors.storeDescription}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="storeStatus"
                label="Store Status"
                labelPlacement="outside"
                placeholder="Select status"
                variant="bordered"
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

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
            <Input
              name="operatedBy"
              label="Operated By"
              labelPlacement="outside"
              variant="flat"
              radius="full"
              isReadOnly
              value={operatedBy}
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
