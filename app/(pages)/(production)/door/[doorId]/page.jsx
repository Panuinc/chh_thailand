"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFetchDoorById, useSubmitDoor } from "@/modules/production/door/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIDoorForm from "@/modules/production/door/components/UIDoorForm";
import { Toaster } from "react-hot-toast";

export default function DoorUpdate() {
  const { doorId } = useParams();
  const { userId, userName } = useSessionUser();
  const { door, loading } = useFetchDoorById(doorId);

  const {
    formRef,
    formData,
    setFormData,
    errors,
    handleChange,
    handleSubmit,
  } = useFormHandler(
    {
      doorId: "",
      doorProjectCode: "",
      doorCode: "",
      doorRevisionNumber: "",
      doorProjectName: "",
      doorCustomerId: "",
      doorUserSaleId: "",

      doorDimensionsWidth: "",
      doorDimensionsHeight: "",
      doorDimensionsThickness: "",

      doorType: "",
      doorSurfaceMaterial: "",
      doorSurfaceThickness: "",
      doorCoreMaterial: "",

      doorSurfaceTypeTop: "",
      doorSurfaceTypeTopCode: "",
      doorSurfaceTypeTopThickness: "",
      doorSurfaceTypeTopDescription: "",

      doorSurfaceTypeBottom: "",
      doorSurfaceTypeBottomCode: "",
      doorSurfaceTypeBottomThickness: "",
      doorSurfaceTypeBottomDescription: "",

      doorCreateBy: "",
      doorStatus: "",
      doorUpdateBy: userId,

      grooveLines: [],
      hinges: [],
      locks: [],
      peepHole: undefined,
      louvers: [],
      glassPanels: [],
      skeleton: undefined,
    },
    useSubmitDoor({ mode: "update", doorId, userId })
  );

  useEffect(() => {
    if (door) {
      setFormData({
        ...door,
        // เพิ่ม logic แปลง nested object ถ้ามีความซับซ้อน (optional)
      });
    }
  }, [door]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />
      <UIDoorForm
        headerContent="Door Update"
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
