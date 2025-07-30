import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchPartnerById(partnerId) {
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!partnerId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/purchase/partner/${partnerId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.partner?.length) {
            setPartner(result.partner[0]);
          } else {
            toast.error(result.error || "Failed to load partner.");
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
  }, [partnerId]);

  return { partner, loading };
}
