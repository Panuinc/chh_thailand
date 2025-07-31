import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSubmitStore({ mode = "create", storeId, userId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      const byField = mode === "create" ? "storeCreateBy" : "storeUpdateBy";
      form.append(byField, userId);

      if (formData.zones) {
        const cleanedZones = formData.zones.map((zone) => ({
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription || "",
          zoneStatus: zone.zoneStatus,
        }));
        form.append("zones", JSON.stringify(cleanedZones));
      }

      const url =
        mode === "create"
          ? "/api/warehouse/store"
          : `/api/warehouse/store/${storeId}`;
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
          setTimeout(() => router.push("/store"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to submit store.");
        }
      } catch (err) {
        toast.error(`Failed to submit store: ${err.message}`);
      }
    },
    [mode, storeId, userId, router]
  );
}
