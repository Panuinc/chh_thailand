import { useEffect, useState } from "react";

export function useFetchAisles(apiUrl = "/api/warehouse/aisle") {
  const [aisles, setAisles] = useState([]);
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
          setAisles(Array.isArray(data.aisle) ? data.aisle : []);
        }
      } catch (err) {
        console.error("❌ useFetchAisles error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { aisles, loading };
}
