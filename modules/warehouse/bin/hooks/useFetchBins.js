import { useEffect, useState } from "react";

export function useFetchBins(apiUrl = "/api/warehouse/bin") {
  const [bins, setBins] = useState([]);
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
          setBins(Array.isArray(data.bin) ? data.bin : []);
        }
      } catch (err) {
        console.error("❌ useFetchBins error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { bins, loading };
}
