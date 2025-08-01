import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchLevelById(levelId) {
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!levelId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/warehouse/level/${levelId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.level?.length) {
            setLevel(result.level[0]);
          } else {
            toast.error(result.error || "Failed to load level.");
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
  }, [levelId]);

  return { level, loading };
}
