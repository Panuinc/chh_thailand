"use client";

import React, { useCallback, useState } from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function UICustomerForm({
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
        toast.error('Do not include the word "บริษัท" (Company) in the name.');
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

        handleInputChange("customerTax")(taxpayerId || vatSearchId);
        handleInputChange("customerName")(companyName || vatSearchName);

        if (customerBranch) {
          handleInputChange("customerBranch")(customerBranch);
        }

        if (fullAddress) {
          handleInputChange("customerAddress")(fullAddress);
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
      if (/^No Data Found/i.test(apiMsg)) {
        toast.error("❌ No data found.");
      } else {
        toast.error(`❌ ${apiMsg}`);
      }
      if (process.env.NODE_ENV === "development") {
        console.debug("❌ VATINFO Error:", err);
      }
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
                  <SelectItem key="companyName">Company Name</SelectItem>
                  <SelectItem key="taxId">Tax ID (13 digits)</SelectItem>
                </Select>
              </div>

              {vatSearchType === "companyName" && (
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    label="Company Name"
                    labelPlacement="outside"
                    placeholder="Enter company name"
                    variant="bordered"
                    radius="full"
                    value={vatSearchName}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/บริษัท/i.test(inputValue)) {
                        toast.error(
                          'Do not include the word "บริษัท" in the name.'
                        );
                      }
                      setVatSearchName(inputValue);
                    }}
                    isInvalid={vatSearchName && /บริษัท/i.test(vatSearchName)}
                    errorMessage={
                      vatSearchName && /บริษัท/i.test(vatSearchName)
                        ? 'Do not include the word "บริษัท" in the name.'
                        : ""
                    }
                  />
                </div>
              )}

              {vatSearchType === "taxId" && (
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    label="Taxpayer ID"
                    labelPlacement="outside"
                    placeholder="Enter tax ID"
                    variant="bordered"
                    radius="full"
                    value={vatSearchId}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 13) setVatSearchId(value);
                    }}
                    isInvalid={vatSearchId && vatSearchId.length !== 13}
                    errorMessage={
                      vatSearchId && vatSearchId.length !== 13
                        ? "Tax ID must be exactly 13 digits."
                        : ""
                    }
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
          </>
        )}

        <div className="flex flex-col lg:flex-row items-start justify-start w-full p-2 gap-2">
          <div className="flex items-center justify-center h-full px-8 py-4 gap-2 bg-black text-white font-semibold rounded-lg">
            Customer Profile
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="customerTax"
              label="Customer Tax"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.customerTax || ""}
              onChange={handleInputChange("customerTax")}
              isInvalid={!!errors.customerTax}
              errorMessage={errors.customerTax}
            />
          </div>
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
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="customerBranch"
              label="Customer Branch"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.customerBranch || ""}
              onChange={handleInputChange("customerBranch")}
              isInvalid={!!errors.customerBranch}
              errorMessage={errors.customerBranch}
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

        <div className="flex flex-col lg:flex-row items-start justify-start w-full p-2 gap-2">
          <div className="flex items-center justify-center h-full px-8 py-4 gap-2 bg-black text-white font-semibold rounded-lg">
            Leaders Personal
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2">
          {(Array.isArray(formData.customerLeaders)
            ? formData.customerLeaders
            : []
          ).map((leader, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border-b-1 border-default"
            >
              <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                <Input
                  label="Leader Name"
                  labelPlacement="outside"
                  placeholder="Please Enter Data"
                  variant="bordered"
                  color="default"
                  radius="full"
                  value={leader.customerLeaderName}
                  onChange={(e) => {
                    const next = [...formData.customerLeaders];
                    next[index] = {
                      ...next[index],
                      customerLeaderName: e.target.value,
                    };
                    setFormData({ ...formData, customerLeaders: next });
                  }}
                />
              </div>
              <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                <Input
                  label="Leader Email"
                  labelPlacement="outside"
                  placeholder="Please Enter Data"
                  variant="bordered"
                  color="default"
                  radius="full"
                  value={leader.customerLeaderEmail}
                  onChange={(e) => {
                    const next = [...formData.customerLeaders];
                    next[index] = {
                      ...next[index],
                      customerLeaderEmail: e.target.value,
                    };
                    setFormData({ ...formData, customerLeaders: next });
                  }}
                />
              </div>
              <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                <Input
                  label="Leader Phone"
                  labelPlacement="outside"
                  placeholder="Please Enter Data"
                  variant="bordered"
                  color="default"
                  radius="full"
                  value={leader.customerLeaderPhone}
                  onChange={(e) => {
                    const next = [...formData.customerLeaders];
                    next[index] = {
                      ...next[index],
                      customerLeaderPhone: e.target.value,
                    };
                    setFormData({ ...formData, customerLeaders: next });
                  }}
                />
              </div>
              <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                <Select
                  label="Decision Maker?"
                  labelPlacement="outside"
                  placeholder="Please Select"
                  variant="bordered"
                  color="default"
                  radius="full"
                  selectedKeys={[
                    leader.customerLeaderIsDecisionMaker ? "true" : "false",
                  ]}
                  onSelectionChange={(keys) => {
                    const next = [...formData.customerLeaders];
                    next[index] = {
                      ...next[index],
                      customerLeaderIsDecisionMaker: [...keys][0] === "true",
                    };
                    setFormData({ ...formData, customerLeaders: next });
                  }}
                >
                  <SelectItem key="true">Yes</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              </div>

              <div className="flex items-end justify-end w-full lg:w-auto h-full p-2 gap-2">
                <Button
                  color="danger"
                  radius="full"
                  className="p-3 gap-2"
                  onPress={() => {
                    const next = [...formData.customerLeaders];
                    next.splice(index, 1);
                    setFormData({ ...formData, customerLeaders: next });
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-end w-full h-full p-2 gap-2">
            <Button
              type="button"
              color="secondary"
              radius="full"
              className="h-full p-3 gap-2"
              onPress={() => {
                const next = Array.isArray(formData.customerLeaders)
                  ? [...formData.customerLeaders]
                  : [];
                next.push({
                  customerLeaderId: undefined,
                  customerLeaderName: "",
                  customerLeaderEmail: "",
                  customerLeaderPhone: "",
                  customerLeaderIsDecisionMaker: false,
                });
                setFormData({ ...formData, customerLeaders: next });
              }}
            >
              ➕ Add Leader
            </Button>
          </div>
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
                        className="w-full h-full p-3 gap-2 hover:text-primary hover:font-semibold"
                        onPress={() => {
                          handleInputChange("customerTax")(item.taxpayerId);
                          handleInputChange("customerName")(item.companyName);
                          handleInputChange("customerBranch")(
                            item.customerBranch
                          );
                          handleInputChange("customerAddress")(
                            item.fullAddress
                          );
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
            <div className="flex items-center justify-end h-full p-2 gap-2">
              <Button
                onPress={() => setShowResultModal(false)}
                color="danger"
                radius="full"
                className="w-3/12 h-full p-3 gap-2"
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
