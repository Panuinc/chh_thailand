import { useEffect, useState } from "react";

export function useFetchPartners(apiUrl = "/api/purchase/partner") {
  const [partners, setPartners] = useState([]);
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
          setPartners(Array.isArray(data.partner) ? data.partner : []);
        }
      } catch (err) {
        console.error("❌ useFetchPartners error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { partners, loading };
}
