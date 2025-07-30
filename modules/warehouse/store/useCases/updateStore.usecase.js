import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateStoreUseCase(data) {
  const parsed = storePutSchema.safeParse(data);
  if (!parsed.success)
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };

  const code = parsed.data.storeCode.trim().toUpperCase();
  const existing = await StoreService.getById(parsed.data.storeId);
  if (!existing) throw { status: 404, message: "Store not found" };

  if (code !== existing.storeCode) {
    const dup = await StoreValidator.isDuplicateStoreCode(code);
    if (dup)
      throw { status: 409, message: `Store code '${code}' already exists` };
  }

  const baseData = {
    storeCode: code,
    storeName: parsed.data.storeName.trim(),
    storeLocation: parsed.data.storeLocation.trim(),
    storeDescription: parsed.data.storeDescription ?? null,
    storeStatus: parsed.data.storeStatus,
    storeUpdateBy: parsed.data.storeUpdateBy,
    storeUpdateAt: getLocalNow(),
  };

  if (parsed.data.zones.length === 0)
    return StoreService.update(parsed.data.storeId, baseData);

  const nested = {
    ...baseData,
    storeZones: {
      create: parsed.data.zones.map((z) => ({
        zoneCode: z.zoneCode.trim().toUpperCase(),
        zoneName: z.zoneName.trim(),
        zoneDescription: z.zoneDescription ?? null,
        zoneAisles: {
          create: z.aisles.map((a) => ({
            aisleCode: a.aisleCode.trim().toUpperCase(),
            aisleName: a.aisleName.trim(),
            aisleRacks: {
              create: a.racks.map((r) => ({
                rackCode: r.rackCode.trim().toUpperCase(),
                rackName: r.rackName.trim(),
                rackLevels: {
                  create: r.levels.map((l) => ({
                    levelCode: l.levelCode.trim().toUpperCase(),
                    levelName: l.levelName.trim(),
                    levelBins: {
                      create: l.bins.map((b) => ({
                        binCode: b.binCode.trim().toUpperCase(),
                        binRow: b.binRow.trim(),
                        binType: b.binType.trim(),
                        binUsage: b.binUsage.trim(),
                        binCapacity: b.binCapacity,
                        binPosX: b.binPosX,
                        binPosY: b.binPosY,
                        binPosZ: b.binPosZ,
                      })),
                    },
                  })),
                },
              })),
            },
          })),
        },
      })),
    },
  };

  return StoreService.replaceNested(parsed.data.storeId, nested);
}
