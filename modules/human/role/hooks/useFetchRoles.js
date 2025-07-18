import { useEffect, useState } from "react";

export function useFetchRoles(apiUrl = "/api/human/role") {
  const [roles, setRoles] = useState([]);
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
          setRoles(Array.isArray(data.role) ? data.role : []);
        }
      } catch (err) {
        console.error("❌ useFetchRoles error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { roles, loading };
}
