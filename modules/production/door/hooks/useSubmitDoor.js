import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSubmitDoor({ mode = "create", doorId, userId }) {
  const router = useRouter();

  return useCallback(
    async (formRef, formData, setErrors) => {
      const form = new FormData(formRef);
      const byField = mode === "create" ? "doorCreateBy" : "doorUpdateBy";
      form.append(byField, userId);

      if (formData.doorGrooveLines) {
        const cleanedGrooveLines = formData.doorGrooveLines.map((GrooveLines) => ({
          doorGrooveLinesId: GrooveLines.doorGrooveLinesId || undefined,
          doorGrooveLinesDistanceFromTop: GrooveLines.doorGrooveLinesDistanceFromTop,
          doorGrooveLinesDistanceFromLeft: GrooveLines.doorGrooveLinesDistanceFromLeft,
          doorGrooveLinesWidth: GrooveLines.doorGrooveLinesWidth,
          doorGrooveLinesLength: GrooveLines.doorGrooveLinesLength,
        }));
        form.append("grooveLines", JSON.stringify(cleanedGrooveLines));
      }

      if (formData.hinges) {
        const cleanedHinges = formData.hinges.map((hinge) => ({
          doorHingesId: hinge.doorHingesId || undefined,
          doorHingesDistanceFromTop: hinge.doorHingesDistanceFromTop,
          doorHingesSide: hinge.doorHingesSide,
        }));
        form.append("hinges", JSON.stringify(cleanedHinges));
      }

      if (formData.locks) {
        const cleanedLocks = formData.locks.map((lock) => ({
          doorLocksId: lock.doorLocksId || undefined,
          doorLocksDistanceFromTop: lock.doorLocksDistanceFromTop,
          doorLocksDistanceFromEdge: lock.doorLocksDistanceFromEdge,
          doorLocksSide: lock.doorLocksSide,
          doorLocksType: lock.doorLocksType,
        }));
        form.append("locks", JSON.stringify(cleanedLocks));
      }

      if (formData.peepHole) {
        const cleanedPeepHole = {
          doorPeepHoleId: formData.peepHole.doorPeepHoleId || undefined,
          doorPeepHoleDistanceFromBottom: formData.peepHole.doorPeepHoleDistanceFromBottom,
          doorPeepHoleDiameter: formData.peepHole.doorPeepHoleDiameter,
        };
        form.append("peepHole", JSON.stringify(cleanedPeepHole));
      }

      if (formData.louvers) {
        const cleanedLouvers = formData.louvers.map((louver) => ({
          doorLouversId: louver.doorLouversId || undefined,
          doorLouversDistanceFromTop: louver.doorLouversDistanceFromTop,
          doorLouversDistanceFromLeft: louver.doorLouversDistanceFromLeft,
          doorLouversWidth: louver.doorLouversWidth,
          doorLouversHeight: louver.doorLouversHeight,
        }));
        form.append("louvers", JSON.stringify(cleanedLouvers));
      }

      if (formData.glassPanels) {
        const cleanedGlassPanels = formData.glassPanels.map((panel) => ({
          doorGlassPanelsId: panel.doorGlassPanelsId || undefined,
          doorGlassPanelsDistanceFromTop: panel.doorGlassPanelsDistanceFromTop,
          doorGlassPanelsDistanceFromLeft: panel.doorGlassPanelsDistanceFromLeft,
          doorGlassPanelsWidth: panel.doorGlassPanelsWidth,
          doorGlassPanelsHeight: panel.doorGlassPanelsHeight,
          doorGlassPanelsType: panel.doorGlassPanelsType,
        }));
        form.append("glassPanels", JSON.stringify(cleanedGlassPanels));
      }

      if (formData.skeleton) {
        const skeleton = formData.skeleton;
        const cleanedSkeleton = {
          doorSkeletonId: skeleton.doorSkeletonId || undefined,
          doorSkeletonMaterialType: skeleton.doorSkeletonMaterialType,
          doorSkeletonRails: skeleton.doorSkeletonRails,
          doorSkeletonStiles: skeleton.doorSkeletonStiles,
          rails: skeleton.rails?.map((rail) => ({
            doorSkeletonRailsId: rail.doorSkeletonRailsId || undefined,
            doorSkeletonRailsWidth: rail.doorSkeletonRailsWidth,
            doorSkeletonRailsQuantity: rail.doorSkeletonRailsQuantity,
            doorSkeletonRailsEquallySpaced: rail.doorSkeletonRailsEquallySpaced,
            doorSkeletonRailsEquallySpacedPositionsFromTop:
              rail.doorSkeletonRailsEquallySpacedPositionsFromTop,
          })),
          stiles: skeleton.stiles?.map((stile) => ({
            doorSkeletonStilesId: stile.doorSkeletonStilesId || undefined,
            doorSkeletonStilesWidth: stile.doorSkeletonStilesWidth,
            doorSkeletonStilesQuantity: stile.doorSkeletonStilesQuantity,
            doorSkeletonStilesEquallySpaced: stile.doorSkeletonStilesEquallySpaced,
            doorSkeletonStilesPositionsFromLeft: stile.doorSkeletonStilesPositionsFromLeft,
          })),
          lockSet: skeleton.lockSet
            ? {
                doorSkeletonLockSetId: skeleton.lockSet.doorSkeletonLockSetId || undefined,
                doorSkeletonLockSetWidth: skeleton.lockSet.doorSkeletonLockSetWidth,
                doorSkeletonLockSetHeight: skeleton.lockSet.doorSkeletonLockSetHeight,
                doorSkeletonLockSetDistanceFromTopToCenter:
                  skeleton.lockSet.doorSkeletonLockSetDistanceFromTopToCenter,
                doorSkeletonLockSetSide: skeleton.lockSet.doorSkeletonLockSetSide,
              }
            : undefined,
        };
        form.append("skeleton", JSON.stringify(cleanedSkeleton));
      }

      const url =
        mode === "create"
          ? "/api/production/door"
          : `/api/production/door/${doorId}`;
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
          setTimeout(() => router.push("/door"), 1500);
        } else {
          setErrors(result.details || {});
          toast.error(result.error || "Failed to submit door.");
        }
      } catch (err) {
        toast.error(`Failed to submit door: ${err.message}`);
      }
    },
    [mode, doorId, userId, router]
  );
}
