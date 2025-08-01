import { storePostSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateStoreUseCase(data) {
  if (typeof data.storeZones === "string") {
    try {
      data.storeZones = JSON.parse(data.storeZones);
    } catch (e) {
      data.storeZones = [];
    }
  }

  const parsed = storePostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedCode = parsed.data.storeCode.trim();

  const duplicate = await StoreValidator.isDuplicateStoreCode(normalizedCode);
  if (duplicate) {
    throw {
      status: 409,
      message: `Store with code '${normalizedCode}' already exists`,
    };
  }

  return StoreService.create({
    storeCode: normalizedCode,
    storeName: parsed.data.storeName.trim(),
    storeLocation: parsed.data.storeLocation.trim(),
    storeDescription: parsed.data.storeDescription.trim(),
    storeCreateAt: getLocalNow(),
    createdBy: {
      connect: { userId: parsed.data.storeCreateBy },
    },
    storeZones: {
      create:
        parsed.data.storeZones?.map((zone) => ({
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription,
          zoneStatus: zone.zoneStatus,
          zoneCreateAt: getLocalNow(),
          zoneCreateBy: parsed.data.storeCreateBy,
          zoneAisles: {
            create:
              zone.zoneAisles?.map((aisle) => ({
                aisleCode: aisle.aisleCode,
                aisleName: aisle.aisleName,
                aisleDescription: aisle.aisleDescription,
                aisleCreateAt: getLocalNow(),
                aisleCreateBy: parsed.data.storeCreateBy,
                aisleRacks: {
                  create:
                    aisle.aisleRacks?.map((rack) => ({
                      rackCode: rack.rackCode,
                      rackName: rack.rackName,
                      rackDescription: rack.rackDescription,
                      rackCreateAt: getLocalNow(),
                      rackCreateBy: parsed.data.storeCreateBy,
                      rackLevels: {
                        create:
                          rack.rackLevels?.map((level) => ({
                            levelCode: level.levelCode,
                            levelName: level.levelName,
                            levelDescription: level.levelDescription,
                            levelCreateAt: getLocalNow(),
                            levelCreateBy: parsed.data.storeCreateBy,
                            levelBins: {
                              create:
                                level.levelBins?.map((bin) => ({
                                  binCode: bin.binCode,
                                  binDescription: bin.binDescription,
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
                                  binCreateAt: getLocalNow(),
                                  binCreateBy: parsed.data.storeCreateBy,
                                })) || [],
                            },
                          })) || [],
                      },
                    })) || [],
                },
              })) || [],
          },
        })) || [],
    },
  });
}
