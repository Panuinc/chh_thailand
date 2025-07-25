"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  useFetchCustomerById,
  useSubmitCustomer,
} from "@/modules/sale/customer/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UICustomerForm from "@/modules/sale/customer/components/UICustomerForm";
import { Toaster } from "react-hot-toast";

export default function CustomerUpdate() {
  const { customerId } = useParams();
  const { userId, userName } = useSessionUser();
  const { customer, loading } = useFetchCustomerById(customerId);

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        customerTax: "",
        customerName: "",
        customerBranch: "",
        customerAddress: "",
        customerPhone: "",
        customerType: "",
        customerStatus: "",
        customerLeaders: [],
      },
      useSubmitCustomer({ mode: "update", customerId, userId })
    );

  useEffect(() => {
    if (customer) {
      setFormData({
        ...customer,
        customerLeaders: Array.isArray(customer.leaders)
          ? customer.leaders.map((leader) => ({
              customerLeaderId: leader.customerLeaderId,
              customerLeaderName: leader.customerLeaderName,
              customerLeaderEmail: leader.customerLeaderEmail,
              customerLeaderPhone: leader.customerLeaderPhone,
              customerLeaderIsDecisionMaker:
                leader.customerLeaderIsDecisionMaker,
            }))
          : [],
      });
    }
  }, [customer]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UICustomerForm
        headerContent="Customer Update"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        setFormData={setFormData}
        operatedBy={userName}
        isUpdate
      />
    </>
  );
}
