import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchAisleById(aisleId) {
  const [aisle, setAisle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!aisleId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/warehouse/aisle/${aisleId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.aisle?.length) {
            setAisle(result.aisle[0]);
          } else {
            toast.error(result.error || "Failed to load aisle.");
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
  }, [aisleId]);

  return { aisle, loading };
}
