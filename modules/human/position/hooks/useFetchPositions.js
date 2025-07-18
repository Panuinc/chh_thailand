import { useEffect, useState } from "react";

export function useFetchPositions(apiUrl = "/api/human/position") {
  const [positions, setPositions] = useState([]);
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
          setPositions(Array.isArray(data.position) ? data.position : []);
        }
      } catch (err) {
        console.error("❌ useFetchPositions error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { positions, loading };
}
