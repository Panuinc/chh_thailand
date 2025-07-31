"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  useFetchStoreById,
  useSubmitStore,
} from "@/modules/warehouse/store/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIStoreForm from "@/modules/warehouse/store/components/UIStoreForm";
import { Toaster } from "react-hot-toast";

export default function StoreUpdate() {
  const { storeId } = useParams();
  const { userId, userName } = useSessionUser();
  const { store, loading } = useFetchStoreById(storeId);

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useFormHandler(
      {
        storeTax: "",
        storeName: "",
        storeBranch: "",
        storeAddress: "",
        storePhone: "",
        storeType: "",
        storeStatus: "",
        storeLeaders: [],
      },
      useSubmitStore({ mode: "update", storeId, userId })
    );

  useEffect(() => {
    if (store) {
      setFormData({
        ...store,
        storeLeaders: Array.isArray(store.leaders)
          ? store.leaders.map((leader) => ({
              storeLeaderId: leader.storeLeaderId,
              storeLeaderName: leader.storeLeaderName,
              storeLeaderEmail: leader.storeLeaderEmail,
              storeLeaderPhone: leader.storeLeaderPhone,
              storeLeaderIsDecisionMaker:
                leader.storeLeaderIsDecisionMaker,
            }))
          : [],
      });
    }
  }, [store]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIStoreForm
        headerContent="Store Update"
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
