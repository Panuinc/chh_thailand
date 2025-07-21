import { useEffect, useState } from "react";

export function useFetchUsers(apiUrl = "/api/human/user") {
  const [users, setUsers] = useState([]);
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
          setUsers(Array.isArray(data.user) ? data.user : []);
        }
      } catch (err) {
        console.error("❌ useFetchUsers error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { users, loading };
}
