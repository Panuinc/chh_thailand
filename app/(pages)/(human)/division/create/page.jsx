"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDivisionForm } from "@/modules/human/division/hooks";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIDivisionForm from "@/modules/human/division/components/UIDivisionForm";

export default function DivisionCreate() {
  const router = useRouter();
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      form.append("divisionCreateBy", userId);

      try {
        const res = await fetch("/api/human/division", {
          method: "POST",
          body: form,
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (res.ok) {
          toast.success(result.message);
          setTimeout(() => router.push("/division"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to create division.");
        }
      } catch (err) {
        toast.error(`Failed to create division: ${err.message}`);
      }
    },
    [userId, router]
  );

  const { formRef, formData, errors, handleChange, handleSubmit } = useDivisionForm(
    { divisionName: "" },
    onSubmitHandler
  );

  return (
    <>
      <Toaster position="top-right" />
      <UIDivisionForm
        headerContent="Division Create"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={userName}
      />
    </>
  );
}
