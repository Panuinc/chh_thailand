import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchCustomerById(customerId) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/sale/customer/${customerId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.customer?.length) {
            setCustomer(result.customer[0]);
          } else {
            toast.error(result.error || "Failed to load customer.");
          }
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [customerId]);

  return { customer, loading };
}
