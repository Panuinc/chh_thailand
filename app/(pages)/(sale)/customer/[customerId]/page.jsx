"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFetchCustomerById, useSubmitCustomer } from "@/modules/sale/customer/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UICustomerForm from "@/modules/sale/customer/components/UICustomerForm";
import { Toaster } from "react-hot-toast";

export default function CustomerUpdate() {
  const { customerId } = useParams();
  const { userId, userName } = useSessionUser();
  const { customer, loading } = useFetchCustomerById(customerId);

  const onSubmitHandler = useSubmitCustomer({
    mode: "update",
    customerId,
    userId,
  });

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler({ customerName: "", customerStatus: "" }, onSubmitHandler);

  useEffect(() => {
    if (customer) setFormData(customer);
  }, [customer, setFormData]);

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
        operatedBy={userName}
        isUpdate
      />
    </>
  );
}
