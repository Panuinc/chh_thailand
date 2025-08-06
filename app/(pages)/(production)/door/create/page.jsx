"use client";

import { useSessionUser } from "@/hooks/useSessionUser";
import { useSubmitDoor } from "@/modules/production/door/hooks";
import { useFormHandler } from "@/hooks/useFormHandler";
import UIDoorForm from "@/modules/production/door/components/UIDoorForm";
import { Toaster } from "react-hot-toast";

export default function DoorCreate() {
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useSubmitDoor({
    mode: "create",
    userId,
  });

  const { formRef, formData, errors, handleChange, handleSubmit, setFormData } =
    useFormHandler(
      {
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

        doorCreateBy: userId,

        grooveLines: [],
        hinges: [],
        locks: [],
        peepHole: undefined,
        louvers: [],
        glassPanels: [],
        skeleton: undefined,
      },
      onSubmitHandler
    );

  return (
    <>
      <Toaster position="top-right" />
      <UIDoorForm
        headerContent="Door Create"
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
