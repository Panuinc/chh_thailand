import { useEffect, useState } from "react";

export function useFetchDoors(apiUrl = "/api/production/door") {
  const [doors, setDoors] = useState([]);
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
          setDoors(Array.isArray(data.door) ? data.door : []);
        }
      } catch (err) {
        console.error("❌ useFetchDoors error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { doors, loading };
}
