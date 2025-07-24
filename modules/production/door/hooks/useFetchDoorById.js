import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchDoorById(doorId) {
  const [door, setDoor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doorId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/production/door/${doorId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.door?.length) {
            setDoor(result.door[0]);
          } else {
            toast.error(result.error || "Failed to load door.");
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
  }, [doorId]);

  return { door, loading };
}
