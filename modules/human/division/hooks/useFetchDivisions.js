import { useEffect, useState } from "react";

export function useFetchDivisions(apiUrl = "/api/human/division") {
  const [divisions, setDivisions] = useState([]);
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
          setDivisions(Array.isArray(data.division) ? data.division : []);
        }
      } catch (err) {
        console.error("❌ useFetchDivisions error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { divisions, loading };
}
