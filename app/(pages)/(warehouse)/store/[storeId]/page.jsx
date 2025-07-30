"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [zones, setZones] = useState([]);
  const formRef = useRef();

  const onSubmitHandler = useSubmitStore({ mode: "update", storeId, userId });

  const {
    formData,
    setFormData,
    errors,
    handleChange,
    handleSubmit: baseSubmit,
  } = useFormHandler(
    {
      storeCode: "",
      storeName: "",
      storeLocation: "",
      storeDescription: "",
      storeStatus: "Enable",
    },
    onSubmitHandler
  );

  useEffect(() => {
    if (store) {
      setFormData(store);
      setZones(store.zones || []);
    }
  }, [store, setFormData]);

  const handleNestedChange = (zi, path, value) => {
    const newZones = [...zones];
    let target = newZones[zi];
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]];
    }
    target[path[path.length - 1]] = value;
    setZones(newZones);
  };

  const addZone = () =>
    setZones([
      ...zones,
      { zoneCode: "", zoneName: "", zoneDescription: "", aisles: [] },
    ]);

  const addAisle = (zi) => {
    const newZones = [...zones];
    newZones[zi].aisles.push({ aisleCode: "", aisleName: "", racks: [] });
    setZones(newZones);
  };

  const addRack = (zi, ai) => {
    const newZones = [...zones];
    newZones[zi].aisles[ai].racks.push({
      rackCode: "",
      rackName: "",
      levels: [],
    });
    setZones(newZones);
  };

  const addLevel = (zi, ai, ri) => {
    const newZones = [...zones];
    newZones[zi].aisles[ai].racks[ri].levels.push({
      levelCode: "",
      levelName: "",
      bins: [],
    });
    setZones(newZones);
  };

  const addBin = (zi, ai, ri, li) => {
    const newZones = [...zones];
    newZones[zi].aisles[ai].racks[ri].levels[li].bins.push({
      binCode: "",
      binRow: "",
      binType: "",
      binUsage: "",
      binCapacity: 0,
      binPosX: 0,
      binPosY: 0,
      binPosZ: 0,
    });
    setZones(newZones);
  };

  const handleSubmit = (e) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "zones";
    input.value = JSON.stringify(zones);
    formRef.current.appendChild(input);
    baseSubmit(e);
  };

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
        operatedBy={userName}
        isUpdate
        zones={zones}
        onAddZone={addZone}
        onAddAisle={addAisle}
        onAddRack={addRack}
        onAddLevel={addLevel}
        onAddBin={addBin}
        onNestedChange={handleNestedChange}
      />
    </>
  );
}
