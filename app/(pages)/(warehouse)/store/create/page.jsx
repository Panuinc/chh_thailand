"use client";

import { useRef, useState } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitStore } from "@/modules/warehouse/store/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UIStoreForm from "@/modules/warehouse/store/components/UIStoreForm";
import { Toaster } from "react-hot-toast";

export default function StoreCreate() {
  const { userId, userName } = useSessionUser();
  const [zones, setZones] = useState([]);
  const formRef = useRef();

  const onSubmitHandler = useSubmitStore({ mode: "create", userId });

  const {
    formData,
    errors,
    handleChange,
    handleSubmit: baseSubmit,
  } = useFormHandler(
    {
      storeCode: "",
      storeName: "",
      storeLocation: "",
      storeDescription: "",
    },
    onSubmitHandler
  );

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

  return (
    <>
      <Toaster position="top-right" />
      <UIStoreForm
        headerContent="Store Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
        zones={zones}
        onAddZone={addZone}
        onAddAisle={addAisle}
        onAddRack={addRack}
        onAddLevel={addLevel}
        onAddBin={addBin}
        handleNestedChange={handleNestedChange}
      />
    </>
  );
}
