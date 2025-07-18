"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDivisionForm } from "@/modules/human/division/hooks";
import { useSessionUser } from "@/hooks/useSessionUser";
import UIDivisionForm from "@/modules/human/division/components/UIDivisionForm";

export default function DivisionUpdate() {
  const router = useRouter();
  const { divisionId } = useParams();
  const { userId, userName } = useSessionUser();

  const onSubmitHandler = useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      form.append("divisionUpdateBy", userId);

      try {
        const res = await fetch(`/api/human/division/${divisionId}`, {
          method: "PUT",
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
          toast.error(result.error || "Failed to update division.");
        }
      } catch (err) {
        toast.error(`Failed to update division: ${err.message}`);
      }
    },
    [divisionId, userId, router]
  );

  const { formRef, formData, setFormData, errors, handleChange, handleSubmit } =
    useDivisionForm({ divisionName: "", divisionStatus: "" }, onSubmitHandler);

  useEffect(() => {
    if (!divisionId) return;

    (async () => {
      try {
        const res = await fetch(`/api/human/division/${divisionId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (res.ok && result.division?.length) {
          setFormData(result.division[0]);
        } else {
          toast.error(result.error || "Failed to load division.");
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      }
    })();
  }, [divisionId, setFormData]);

  return (
    <>
      <Toaster position="top-right" />
      <UIDivisionForm
        headerContent="Division Update"
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
