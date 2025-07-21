import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSubmitUser({ mode = "create", userId, targetUserId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);

      form.append(mode === "create" ? "userCreateBy" : "userUpdateBy", userId);

      if (mode === "update") {
        form.append("userId", targetUserId);
      }

      if (!form.get("useJobEndDate") || form.get("useJobEndDate") === "") {
        form.delete("useJobEndDate");
      }

      const url =
        mode === "create"
          ? "/api/human/user"
          : `/api/human/user/${targetUserId}`;

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
          setTimeout(() => router.push("/user"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to submit user.");
        }
      } catch (err) {
        toast.error(`Failed to submit user: ${err.message}`);
      }
    },
    [mode, userId, targetUserId, router]
  );
}
