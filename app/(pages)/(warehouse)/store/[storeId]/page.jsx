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
        storeCode: "",
        storeName: "",
        storeLocation: "",
        storeDescription: "",
        storeStatus: "",
        storeZones: [],
      },
      useSubmitStore({ mode: "update", storeId, userId })
    );

  const handleNestedChange = (path, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const parts = path.split(".");
      let current = newData;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          if (part.match(/^\d+$/)) {
            const index = parseInt(part);
            if (!Array.isArray(current)) current = [];
            while (current.length <= index) current.push({});
          } else {
            current[part] = {};
          }
        }
        current = current[part];
      }

      current[parts[parts.length - 1]] = value;
      return newData;
    });
  };

  useEffect(() => {
    if (store) {
      const initialData = {
        storeCode: store.storeCode,
        storeName: store.storeName,
        storeLocation: store.storeLocation,
        storeDescription: store.storeDescription,
        storeStatus: store.storeStatus,
        storeZones:
          store.storeZones?.map((zone) => ({
            zoneId: zone.zoneId,
            zoneCode: zone.zoneCode,
            zoneName: zone.zoneName,
            zoneDescription: zone.zoneDescription || "",
            zoneStatus: zone.zoneStatus,
            zoneAisles:
              zone.zoneAisles?.map((aisle) => ({
                aisleId: aisle.aisleId,
                aisleCode: aisle.aisleCode,
                aisleName: aisle.aisleName,
                aisleDescription: aisle.aisleDescription || "",
                aisleRacks:
                  aisle.aisleRacks?.map((rack) => ({
                    rackId: rack.rackId,
                    rackCode: rack.rackCode,
                    rackName: rack.rackName,
                    rackDescription: rack.rackDescription || "",
                    rackLevels:
                      rack.rackLevels?.map((level) => ({
                        levelId: level.levelId,
                        levelCode: level.levelCode,
                        levelName: level.levelName,
                        levelDescription: level.levelDescription || "",
                        levelBins:
                          level.levelBins?.map((bin) => ({
                            binId: bin.binId,
                            binCode: bin.binCode,
                            binDescription: bin.binDescription || "",
                            binRow: bin.binRow,
                            binType: bin.binType,
                            binUsage: bin.binUsage,
                            binCapacity: bin.binCapacity,
                            binRfidTagId: bin.binRfidTagId,
                            binStatus: bin.binStatus,
                            binFillRate: bin.binFillRate,
                            binPosX: bin.binPosX,
                            binPosY: bin.binPosY,
                            binPosZ: bin.binPosZ,
                          })) || [],
                      })) || [],
                  })) || [],
              })) || [],
          })) || [],
      };

      setFormData(initialData);
    }
  }, [store, setFormData]);

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
        handleInputChange={(e) => {
          if (e.target.name.includes(".")) {
            handleNestedChange(e.target.name, e.target.value);
          } else {
            handleChange(e);
          }
        }}
        setFormData={setFormData}
        operatedBy={userName}
        isUpdate
        onNestedChange={handleNestedChange}
      />
    </>
  );
}
