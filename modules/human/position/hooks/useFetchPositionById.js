import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchPositionById(positionId) {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!positionId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/human/position/${positionId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.position?.length) {
            setPosition(result.position[0]);
          } else {
            toast.error(result.error || "Failed to load position.");
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
  }, [positionId]);

  return { position, loading };
}
