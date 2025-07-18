import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFetchDepartmentById(departmentId) {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!departmentId) return;

    let isActive = true;

    (async () => {
      try {
        const res = await fetch(`/api/human/department/${departmentId}`, {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (isActive) {
          if (res.ok && result.department?.length) {
            setDepartment(result.department[0]);
          } else {
            toast.error(result.error || "Failed to load department.");
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
  }, [departmentId]);

  return { department, loading };
}
