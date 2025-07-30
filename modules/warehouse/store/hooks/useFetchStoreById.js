import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchStoreById(storeId) {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storeId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/warehouse/store/${storeId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.store?.length) {
            setStore(result.store[0]);
          } else {
            toast.error(result.error || "Failed to load store.");
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
  }, [storeId]);

  return { store, loading };
}
