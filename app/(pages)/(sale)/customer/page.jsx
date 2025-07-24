"use client";

import UICustomerList from "@/modules/sale/customer/components/UICustomerList";
import { useFetchCustomers } from "@/modules/sale/customer/hooks";

export default function CustomerList() {
  const { customers, loading } = useFetchCustomers();

  return (
    <UICustomerList
      headerContent="Customer List"
      customers={customers}
      isLoading={loading}
    />
  );
}
