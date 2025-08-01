import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSubmitStore({ mode = "create", storeId, userId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      const byField = mode === "create" ? "storeCreateBy" : "storeUpdateBy";
      form.append(byField, userId);

      if (formData.storeZones) {
        const cleanedZones = formData.storeZones.map((zone) => ({
          zoneId: zone.zoneId || undefined,
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription || "",
          zoneStatus: zone.zoneStatus,
          zoneAisles:
            zone.zoneAisles?.map((aisle) => ({
              aisleId: aisle.aisleId || undefined,
              aisleCode: aisle.aisleCode,
              aisleName: aisle.aisleName,
              aisleDescription: aisle.aisleDescription || "",
              aisleRacks:
                aisle.aisleRacks?.map((rack) => ({
                  rackId: rack.rackId || undefined,
                  rackCode: rack.rackCode,
                  rackName: rack.rackName,
                  rackDescription: rack.rackDescription || "",
                  rackLevels:
                    rack.rackLevels?.map((level) => ({
                      levelId: level.levelId || undefined,
                      levelCode: level.levelCode,
                      levelName: level.levelName,
                      levelDescription: level.levelDescription || "",
                      levelBins:
                        level.levelBins?.map((bin) => ({
                          binId: bin.binId || undefined,
                          binCode: bin.binCode,
                          binDescription: bin.binDescription || "",
                          binRow: bin.binRow,
                          binType: bin.binType,
                          binUsage: bin.binUsage,
                          binCapacity: bin.binCapacity,
                          binRfidTagId: bin.binRfidTagId,
                          binStatus: bin.binStatus,
                          binFillRate: bin.binFillRate,
                          binPosX: bin.binPosX,
                          binPosY: bin.binPosY,
                          binPosZ: bin.binPosZ,
                        })) || [],
                    })) || [],
                })) || [],
            })) || [],
        }));
        form.append("storeZones", JSON.stringify(cleanedZones));
      }

      const url =
        mode === "create"
          ? "/api/warehouse/store"
          : `/api/warehouse/store/${storeId}`;
      const method = mode === "create" ? "POST" : "PUT";

      try {
        const res = await fetch(url, {
          method,
          body: form,
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });

        const result = await res.json();

        if (res.ok) {
          toast.success(result.message);
          setTimeout(() => router.push("/store"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to submit store.");
        }
      } catch (err) {
        toast.error(`Failed to submit store: ${err.message}`);
      }
    },
    [mode, storeId, userId, router]
  );
}
