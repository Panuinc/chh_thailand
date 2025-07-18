import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSubmitRole({ mode = "create", roleId, userId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      const byField = mode === "create" ? "roleCreateBy" : "roleUpdateBy";
      form.append(byField, userId);

      const url =
        mode === "create" ? "/api/human/role" : `/api/human/role/${roleId}`;
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
          setTimeout(() => router.push("/role"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to submit role.");
        }
      } catch (err) {
        toast.error(`Failed to submit role: ${err.message}`);
      }
    },
    [mode, roleId, userId, router]
  );
}
