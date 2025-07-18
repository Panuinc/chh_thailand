import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSubmitDivision({ mode = "create", divisionId, userId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      form.append(
        mode === "create" ? "divisionCreateBy" : "divisionUpdateBy",
        userId
      );

      const url =
        mode === "create"
          ? "/api/human/division"
          : `/api/human/division/${divisionId}`;
      const method = mode === "create" ? "POST" : "PUT";

      try {
        const res = await fetch(url, {
          method,
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
          toast.error(result.error || "Failed to submit division.");
        }
      } catch (err) {
        toast.error(`Failed to submit division: ${err.message}`);
      }
    },
    [mode, divisionId, userId, router]
  );
}
