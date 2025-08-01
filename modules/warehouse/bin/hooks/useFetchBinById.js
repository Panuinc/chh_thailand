import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchBinById(binId) {
  const [bin, setBin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!binId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/warehouse/bin/${binId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.bin?.length) {
            setBin(result.bin[0]);
          } else {
            toast.error(result.error || "Failed to load bin.");
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
  }, [binId]);

  return { bin, loading };
}
