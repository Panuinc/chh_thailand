import { storePostSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateStoreUseCase(data) {
  const parsed = storePostSchema.safeParse(data);
  if (!parsed.success)
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };

  const code = parsed.data.storeCode.trim().toUpperCase();
  const duplicate = await StoreValidator.isDuplicateStoreCode(code);
  if (duplicate)
    throw { status: 409, message: `Store code '${code}' already exists` };

  return StoreService.createNested({
    storeCode: code,
    storeName: parsed.data.storeName.trim(),
    storeLocation: parsed.data.storeLocation.trim(),
    storeDescription: parsed.data.storeDescription ?? null,
    storeCreateBy: parsed.data.storeCreateBy,
    storeCreateAt: getLocalNow(),
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
  });
}
