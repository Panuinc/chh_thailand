"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitCustomer } from "@/modules/sale/customer/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UICustomerForm from "@/modules/sale/customer/components/UICustomerForm";
import { Toaster } from "react-hot-toast";

export default function CustomerCreate() {
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useSubmitCustomer({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit, setFormData } =
    useFormHandler(
      {
        customerTax: "",
        customerName: "",
        customerBranch: "",
        customerAddress: "",
        customerPhone: "",
        customerType: "",
        customerLeaders: [],
      },
      onSubmitHandler
    );

  return (
    <>
      <Toaster position="top-right" />
      <UICustomerForm
        headerContent="Customer Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        setFormData={setFormData}
        operatedBy={userName}
      />
    </>
  );
}
