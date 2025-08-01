import { useEffect, useState } from "react";

export function useFetchZones(apiUrl = "/api/warehouse/zone") {
  const [zones, setZones] = useState([]);
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
          setZones(Array.isArray(data.zone) ? data.zone : []);
        }
      } catch (err) {
        console.error("❌ useFetchZones error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { zones, loading };
}
