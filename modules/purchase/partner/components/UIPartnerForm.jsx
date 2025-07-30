"use client";

import React, { useCallback, useState } from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UIPartnerForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
  setFormData,
}) {
  const [vatSearchId, setVatSearchId] = useState("");
  const [vatSearchName, setVatSearchName] = useState("");
  const [vatSearching, setVatSearching] = useState(false);
  const [vatSearchType, setVatSearchType] = useState("companyName");

  const [vatSearchResults, setVatSearchResults] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);

  const fetchVATInfo = useCallback(async () => {
    const searchByTaxId = vatSearchType === "taxId";
    const searchByName = vatSearchType === "companyName";

    if (searchByTaxId && (!vatSearchId || vatSearchId.length !== 13)) {
      toast.error("Please enter a valid 13-digit Tax ID.");
      return;
    }

    if (searchByName) {
      if (!vatSearchName.trim()) {
        toast.error("Please enter the company name.");
        return;
      }
      if (/บริษัท/i.test(vatSearchName)) {
        toast.error('Do not include the word "บริษัท" in the name.');
        return;
      }
    }

    setVatSearching(true);
    try {
      const res = await axios.post("/api/vatinfo", {
        taxpayerId: searchByTaxId ? vatSearchId.trim() : undefined,
        companyName: searchByName ? vatSearchName.trim() : undefined,
      });

      const results = res.data?.results || [];

      if (results.length === 1) {
        const { taxpayerId, companyName, customerBranch, fullAddress } =
          results[0];

        handleInputChange("partnerTaxId")(taxpayerId || vatSearchId);
        handleInputChange("partnerName")(companyName || vatSearchName);
        if (fullAddress) {
          handleInputChange("partnerAddress")(fullAddress);
        }

        toast.success("🎉 Company data found!");
      } else if (results.length > 1) {
        setVatSearchResults(results);
        setShowResultModal(true);
      } else {
        toast.error("❌ No data found.");
      }
    } catch (err) {
      const apiMsg = err?.response?.data?.error || "Unknown error.";
      toast.error(`❌ ${apiMsg}`);
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
        {!isUpdate && (
          <>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
              <Select
                label="Search By"
                labelPlacement="outside"
                variant="flat"
                radius="full"
                selectedKeys={[vatSearchType]}
                onSelectionChange={(keys) => setVatSearchType([...keys][0])}
              >
                <SelectItem key="companyName">Company Name</SelectItem>
                <SelectItem key="taxId">Tax ID (13 digits)</SelectItem>
              </Select>

              {vatSearchType === "companyName" ? (
                <Input
                  label="Company Name"
                  labelPlacement="outside"
                  placeholder="Enter company name"
                  variant="bordered"
                  radius="full"
                  value={vatSearchName}
                  onChange={(e) => setVatSearchName(e.target.value)}
                />
              ) : (
                <Input
                  label="Tax ID"
                  labelPlacement="outside"
                  placeholder="Enter 13-digit Tax ID"
                  variant="bordered"
                  radius="full"
                  value={vatSearchId}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 13) setVatSearchId(value);
                  }}
                />
              )}
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
              <Button
                type="button"
                color="warning"
                radius="full"
                isLoading={vatSearching}
                onPress={fetchVATInfo}
              >
                Search Partner
              </Button>
            </div>
          </>
        )}

        {/* Partner Info */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <Input
            name="partnerName"
            label="Partner Name"
            labelPlacement="outside"
            placeholder="Please Enter"
            variant="bordered"
            radius="full"
            value={formData.partnerName || ""}
            onChange={handleInputChange("partnerName")}
            isInvalid={!!errors.partnerName}
            errorMessage={errors.partnerName}
          />
          <Input
            name="partnerTaxId"
            label="Tax ID"
            labelPlacement="outside"
            placeholder="Please Enter"
            variant="bordered"
            radius="full"
            value={formData.partnerTaxId || ""}
            onChange={handleInputChange("partnerTaxId")}
            isInvalid={!!errors.partnerTaxId}
            errorMessage={errors.partnerTaxId}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <Input
            name="partnerPhone"
            label="Phone"
            labelPlacement="outside"
            placeholder="Please Enter"
            variant="bordered"
            radius="full"
            value={formData.partnerPhone || ""}
            onChange={handleInputChange("partnerPhone")}
            isInvalid={!!errors.partnerPhone}
            errorMessage={errors.partnerPhone}
          />
          <Input
            name="partnerAddress"
            label="Address"
            labelPlacement="outside"
            placeholder="Please Enter"
            variant="bordered"
            radius="full"
            value={formData.partnerAddress || ""}
            onChange={handleInputChange("partnerAddress")}
            isInvalid={!!errors.partnerAddress}
            errorMessage={errors.partnerAddress}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <Input
            name="partnerEmail"
            label="Email"
            labelPlacement="outside"
            placeholder="Please Enter"
            variant="bordered"
            radius="full"
            value={formData.partnerEmail || ""}
            onChange={handleInputChange("partnerEmail")}
            isInvalid={!!errors.partnerEmail}
            errorMessage={errors.partnerEmail}
          />
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <Select
              name="partnerStatus"
              label="Status"
              labelPlacement="outside"
              placeholder="Please Select"
              variant="bordered"
              radius="full"
              selectedKeys={
                formData.partnerStatus ? [formData.partnerStatus] : []
              }
              onSelectionChange={(keys) =>
                handleInputChange("partnerStatus")([...keys][0])
              }
              isInvalid={!!errors.partnerStatus}
              errorMessage={errors.partnerStatus}
            >
              <SelectItem key="Enable">Enable</SelectItem>
              <SelectItem key="Disable">Disable</SelectItem>
            </Select>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <Input
            name="operatedBy"
            type="text"
            label="Operated By"
            labelPlacement="outside"
            placeholder="Please Enter Data"
            variant="flat"
            radius="full"
            isReadOnly
            value={operatedBy}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <Button type="submit" color="primary" radius="full">
            Save
          </Button>
        </div>
      </form>

      {/* Modal: Search Result */}
      {showResultModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-4 overflow-auto max-h-[80vh]">
            <h2 className="text-xl font-bold mb-4">Select a branch</h2>
            <table className="w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Tax ID</th>
                  <th className="p-2 border">Company</th>
                  <th className="p-2 border">Branch</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">Select</th>
                </tr>
              </thead>
              <tbody>
                {vatSearchResults.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{item.taxpayerId}</td>
                    <td className="p-2 border">{item.companyName}</td>
                    <td className="p-2 border">{item.customerBranch}</td>
                    <td className="p-2 border">{item.fullAddress}</td>
                    <td className="p-2 border text-center">
                      <Button
                        color="none"
                        radius="none"
                        className="hover:text-primary font-semibold"
                        onPress={() => {
                          handleInputChange("partnerTaxId")(item.taxpayerId);
                          handleInputChange("partnerName")(item.companyName);
                          handleInputChange("partnerAddress")(item.fullAddress);
                          setShowResultModal(false);
                          toast.success("✅ Data selected!");
                        }}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end p-2">
              <Button
                onPress={() => setShowResultModal(false)}
                color="danger"
                radius="full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
