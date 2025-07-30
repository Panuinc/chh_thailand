import { useEffect, useState } from "react";

export function useFetchStores(apiUrl = "/api/warehouse/store") {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res = await fetch(apiUrl, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const data = await res.json();

        if (active) {
          setStores(Array.isArray(data.store) ? data.store : []);
        }
      } catch (err) {
        console.error("❌ useFetchStores error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { stores, loading };
}
