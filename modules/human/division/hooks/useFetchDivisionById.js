import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchDivisionById(divisionId) {
  const [division, setDivision] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!divisionId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/human/division/${divisionId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.division?.length) {
            setDivision(result.division[0]);
          } else {
            toast.error(result.error || "Failed to load division.");
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
  }, [divisionId]);

  return { division, loading };
}
