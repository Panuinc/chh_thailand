import { storePostSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateStoreUseCase(data) {
  if (typeof data.storeZones === "string") {
    try {
      data.storeZones = JSON.parse(data.storeZones);
    } catch {
      data.storeZones = [];
    }
  }

  if (Array.isArray(data.storeZones)) {
    data.storeZones = data.storeZones.map((zone) => ({
      ...zone,
      zonePosX: Number(zone.zonePosX || 0),
      zonePosY: Number(zone.zonePosY || 0),
      zoneAisles: (zone.zoneAisles || []).map((aisle) => ({
        ...aisle,
        aislePosX: Number(aisle.aislePosX || 0),
        aislePosY: Number(aisle.aislePosY || 0),
        aisleRacks: (aisle.aisleRacks || []).map((r) => ({
          ...r,
          rackPosX: Number(r.rackPosX || 0),
          rackPosY: Number(r.rackPosY || 0),
          rackLevels: (r.rackLevels || []).map((lv) => ({
            ...lv,
            levelBins: (lv.levelBins || []).map((b) => ({
              ...b,
              binCapacity: Number(b.binCapacity || 0),
              binFillRate: Number(b.binFillRate || 0),
              binPosX: Number(b.binPosX || 0),
              binPosY: Number(b.binPosY || 0),
              binWidth: Number(b.binWidth || 0),
              binHeight: Number(b.binHeight || 0),
              binDepth: Number(b.binDepth || 0),
            })),
          })),
        })),
      })),
    }));
  }

  const parsed = storePostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.storeName.trim().toLowerCase();
  const duplicateCode = await StoreValidator.isDuplicateStoreCode(
    parsed.data.storeCode
  );
  if (duplicateCode)
    throw {
      status: 409,
      message: `Store code '${parsed.data.storeCode}' already exists`,
    };

  return StoreService.create({
    ...parsed.data,
    storeName: normalizedName,
    storeZones: {
      create: (parsed.data.storeZones || []).map((z) => ({
        zoneCode: z.zoneCode.trim().toLowerCase(),
        zoneName: z.zoneName.trim().toLowerCase(),
        zoneDescription: z.zoneDescription,
        zonePosX: z.zonePosX,
        zonePosY: z.zonePosY,
        zoneStatus: z.zoneStatus,
        zoneAisles: {
          create: (z.zoneAisles || []).map((a) => ({
            aisleCode: a.aisleCode.trim().toLowerCase(),
            aisleName: a.aisleName.trim().toLowerCase(),
            aisleDescription: a.aisleDescription,
            aislePosX: a.aislePosX,
            aislePosY: a.aislePosY,
            aisleStatus: a.aisleStatus,
            aisleRacks: a.aisleRacks?.length
              ? {
                  create: a.aisleRacks.map((r) => ({
                    rackCode: r.rackCode.trim().toLowerCase(),
                    rackName: r.rackName.trim().toLowerCase(),
                    rackDescription: r.rackDescription,
                    rackPosX: r.rackPosX,
                    rackPosY: r.rackPosY,
                    rackStatus: r.rackStatus,
                    rackLevels: r.rackLevels?.length
                      ? {
                          create: r.rackLevels.map((lv) => ({
                            levelCode: lv.levelCode.trim().toLowerCase(),
                            levelName: lv.levelName.trim().toLowerCase(),
                            levelDescription: lv.levelDescription,
                            levelStatus: lv.levelStatus,
                            levelBins: lv.levelBins?.length
                              ? {
                                  create: lv.levelBins.map((b) => ({
                                    binCode: b.binCode.trim().toLowerCase(),
                                    binName: b.binName.trim().toLowerCase(),
                                    binDescription: b.binDescription,
                                    binRow: b.binRow,
                                    binType: b.binType,
                                    binUsage: b.binUsage,
                                    binCapacity: b.binCapacity,
                                    binRfidTagId: b.binRfidTagId
                                      .trim()
                                      .toLowerCase(),
                                    binOccupancy: b.binOccupancy,
                                    binFillRate: b.binFillRate,
                                    binPosX: b.binPosX,
                                    binPosY: b.binPosY,
                                    binWidth: b.binWidth,
                                    binHeight: b.binHeight,
                                    binDepth: b.binDepth,
                                    binStatus: b.binStatus,
                                  })),
                                }
                              : undefined,
                          })),
                        }
                      : undefined,
                  })),
                }
              : undefined,
          })),
        },
      })),
    },
    storeCreateAt: getLocalNow(),
  });
}
