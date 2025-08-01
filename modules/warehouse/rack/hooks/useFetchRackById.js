import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchRackById(rackId) {
  const [rack, setRack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rackId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/warehouse/rack/${rackId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.rack?.length) {
            setRack(result.rack[0]);
          } else {
            toast.error(result.error || "Failed to load rack.");
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
  }, [rackId]);

  return { rack, loading };
}
