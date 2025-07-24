import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSubmitDoor({ mode = "create", doorId, userId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      const byField = mode === "create" ? "doorCreateBy" : "doorUpdateBy";
      form.append(byField, userId);

      const url =
        mode === "create" ? "/api/production/door" : `/api/production/door/${doorId}`;
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
          setTimeout(() => router.push("/door"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to submit door.");
        }
      } catch (err) {
        toast.error(`Failed to submit door: ${err.message}`);
      }
    },
    [mode, doorId, userId, router]
  );
}
