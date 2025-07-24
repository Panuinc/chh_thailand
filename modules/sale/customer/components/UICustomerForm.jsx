"use client";

import React, { useCallback, useState } from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import axios from "axios";

export default function UICustomerForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
}) {
  const [vatSearchId, setVatSearchId] = useState("");
  const [vatSearchName, setVatSearchName] = useState("");
  const [vatSearching, setVatSearching] = useState(false);
  const [vatSearchType, setVatSearchType] = useState("taxId");

  const fetchVATInfo = useCallback(async () => {
    const searchByTaxId = vatSearchType === "taxId";
    const searchByName = vatSearchType === "companyName";

    if (searchByTaxId && (!vatSearchId || vatSearchId.length !== 13)) {
      console.warn("❌ กรุณาใส่ Tax ID ให้ครบ 13 หลัก");
      return;
    }

    if (searchByName && !vatSearchName.trim()) {
      console.warn("❌ กรุณาใส่ชื่อบริษัท");
      return;
    }

    setVatSearching(true);
    try {
      const res = await axios.post("/api/vatinfo", {
        taxpayerId: searchByTaxId ? vatSearchId.trim() : undefined,
        companyName: searchByName ? vatSearchName.trim() : undefined,
      });

      const results = res.data.results || [];

      if (results.length > 0) {
        const { taxpayerId, companyName, address } = results[0];
        handleInputChange("customerTaxId")(taxpayerId || vatSearchId);
        handleInputChange("customerName")(companyName || vatSearchName);
        if (address) handleInputChange("customerAddress")(address);
      } else {
        console.warn("❌ No results found.");
      }
    } catch (err) {
      console.error("❌ VATINFO Fetch Error:", err);
    } finally {
      setVatSearching(false);
    }
  }, [vatSearchType, vatSearchId, vatSearchName, handleInputChange]);

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
              label="Search By"
              labelPlacement="outside"
              variant="flat"
              color="default"
              radius="full"
              selectedKeys={[vatSearchType]}
              onSelectionChange={(keys) => setVatSearchType([...keys][0])}
            >
              <SelectItem key="taxId">Taxpayer ID (13 digits)</SelectItem>
              <SelectItem key="companyName">Company Name</SelectItem>
            </Select>
          </div>

          {vatSearchType === "taxId" && (
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                label="Taxpayer ID"
                labelPlacement="outside"
                placeholder="Enter tax ID"
                variant="bordered"
                radius="full"
                value={vatSearchId}
                onChange={(e) => setVatSearchId(e.target.value)}
              />
            </div>
          )}

          {vatSearchType === "companyName" && (
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Input
                label="Company Name"
                labelPlacement="outside"
                placeholder="Enter company name"
                variant="bordered"
                radius="full"
                value={vatSearchName}
                onChange={(e) => setVatSearchName(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center h-full p-2 gap-2">
            <Button
              type="button"
              color="warning"
              radius="full"
              className="w-full h-full p-3 gap-2"
              isLoading={vatSearching}
              onPress={fetchVATInfo}
            >
              Search Data
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="customerName"
              label="Customer Name"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.customerName || ""}
              onChange={handleInputChange("customerName")}
              isInvalid={!!errors.customerName}
              errorMessage={errors.customerName}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="customerAddress"
              label="Customer Address"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.customerAddress || ""}
              onChange={handleInputChange("customerAddress")}
              isInvalid={!!errors.customerAddress}
              errorMessage={errors.customerAddress}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              type="number"
              name="customerPhone"
              label="Customer Phone"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.customerPhone || ""}
              onChange={handleInputChange("customerPhone")}
              isInvalid={!!errors.customerPhone}
              errorMessage={errors.customerPhone}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Select
              name="customerType"
              label="Customer Type"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              color="default"
              radius="full"
              selectedKeys={
                formData.customerType ? [formData.customerType] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("customerType")([...keys][0])
              }
              isInvalid={!!errors.customerType}
              errorMessage={errors.customerType}
            >
              <SelectItem key="Owner">Owner</SelectItem>
              <SelectItem key="CM">CM</SelectItem>
              <SelectItem key="MainConstruction">MainConstruction</SelectItem>
              <SelectItem key="DesignerArchitect">DesignerArchitect</SelectItem>
              <SelectItem key="EndUser">EndUser</SelectItem>
              <SelectItem key="Dealer">Dealer</SelectItem>
            </Select>
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="customerStatus"
                label="Customer Status"
                labelPlacement="outside"
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={
                  formData.customerStatus ? [formData.customerStatus] : []
                }
                onSelectionChange={(keys) =>
                  handleInputChange("customerStatus")([...keys][0])
                }
                isInvalid={!!errors.customerStatus}
                errorMessage={errors.customerStatus}
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
