import { useEffect, useState } from "react";

export function useFetchRacks(apiUrl = "/api/warehouse/rack") {
  const [racks, setRacks] = useState([]);
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
          setRacks(Array.isArray(data.rack) ? data.rack : []);
        }
      } catch (err) {
        console.error("❌ useFetchRacks error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { racks, loading };
}
