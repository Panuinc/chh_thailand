import { useEffect, useState } from "react";

export function useFetchLevels(apiUrl = "/api/warehouse/level") {
  const [levels, setLevels] = useState([]);
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
          setLevels(Array.isArray(data.level) ? data.level : []);
        }
      } catch (err) {
        console.error("❌ useFetchLevels error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { levels, loading };
}
