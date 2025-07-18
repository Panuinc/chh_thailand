import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchRoleById(roleId) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/human/role/${roleId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.role?.length) {
            setRole(result.role[0]);
          } else {
            toast.error(result.error || "Failed to load role.");
          }
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [roleId]);

  return { role, loading };
}
