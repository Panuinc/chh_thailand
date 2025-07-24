import { useEffect, useState } from "react";

export function useFetchCustomers(apiUrl = "/api/sale/customer") {
  const [customers, setCustomers] = useState([]);
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
          setCustomers(Array.isArray(data.customer) ? data.customer : []);
        }
      } catch (err) {
        console.error("❌ useFetchCustomers error:", err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [apiUrl]);

  return { customers, loading };
}
