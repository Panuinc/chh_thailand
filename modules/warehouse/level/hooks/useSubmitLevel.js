import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useSubmitLevel({ mode = "create", levelId, userId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      const fieldName =
        mode === "create" ? "levelCreateBy" : "levelUpdateBy";
      form.append(fieldName, userId);

      const url =
        mode === "create"
          ? "/api/warehouse/level"
          : `/api/warehouse/level/${levelId}`;
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
          setTimeout(() => router.push("/level"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to submit level.");
        }
      } catch (err) {
        toast.error(`Failed to submit level: ${err.message}`);
      }
    },
    [mode, levelId, userId, router]
  );
}
