import { useEffect, useState } from "react";

export function useFetchDepartments(apiUrl = "/api/human/department") {
  const [departments, setDepartments] = useState([]);
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
          setDepartments(Array.isArray(data.department) ? data.department : []);
        }
      } catch (err) {
        console.error("❌ useFetchDepartments error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { departments, loading };
}
