import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSubmitCustomer({ mode = "create", customerId, userId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      const byField =
        mode === "create" ? "customerCreateBy" : "customerUpdateBy";
      form.append(byField, userId);

      if (formData.customerLeaders) {
        const cleanedLeaders = formData.customerLeaders.map((leader) => ({
          customerLeaderId: leader.customerLeaderId || undefined,
          customerLeaderName: leader.customerLeaderName,
          customerLeaderEmail: leader.customerLeaderEmail,
          customerLeaderPhone: leader.customerLeaderPhone,
          customerLeaderIsDecisionMaker: !!leader.customerLeaderIsDecisionMaker,
        }));
        form.append("customerLeaders", JSON.stringify(cleanedLeaders));
      }

      const url =
        mode === "create"
          ? "/api/sale/customer"
          : `/api/sale/customer/${customerId}`;
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
          setTimeout(() => router.push("/customer"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to submit customer.");
        }
      } catch (err) {
        toast.error(`Failed to submit customer: ${err.message}`);
      }
    },
    [mode, customerId, userId, router]
  );
}
