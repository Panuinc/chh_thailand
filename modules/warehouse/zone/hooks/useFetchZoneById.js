import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchZoneById(zoneId) {
  const [zone, setZone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!zoneId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/warehouse/zone/${zoneId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.zone?.length) {
            setZone(result.zone[0]);
          } else {
            toast.error(result.error || "Failed to load zone.");
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
  }, [zoneId]);

  return { zone, loading };
}
