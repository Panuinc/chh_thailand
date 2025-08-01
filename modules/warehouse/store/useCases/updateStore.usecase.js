import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";
import prisma from "@/lib/prisma";

export async function UpdateStoreUseCase(data) {
  if (typeof data.storeZones === "string") {
    try {
      data.storeZones = JSON.parse(data.storeZones);
    } catch (e) {
      data.storeZones = [];
    }
  }

  const parsed = storePutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    storeId,
    storeZones,
    storeUpdateBy,
    storeCode,
    storeName,
    storeLocation,
    storeDescription,
    storeStatus,
  } = parsed.data;

  const existing = await StoreService.getById(storeId);
  if (!existing) {
    throw { status: 404, message: "Store not found" };
  }

  const normalizedCode = storeCode.trim();

  if (normalizedCode !== existing.storeCode) {
    const duplicate = await StoreValidator.isDuplicateStoreCode(normalizedCode);
    if (duplicate) {
      throw {
        status: 409,
        message: `Store with code '${normalizedCode}' already exists`,
      };
    }
  }

  const currentZones = await prisma.zone.findMany({
    where: { zoneStoreId: storeId },
    include: {
      zoneAisles: {
        include: {
          aisleRacks: {
            include: {
              rackLevels: {
                include: {
                  levelBins: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const submittedZoneIds = new Set();
  const submittedAisleIds = new Set();
  const submittedRackIds = new Set();
  const submittedLevelIds = new Set();
  const submittedBinIds = new Set();

  storeZones.forEach((zone) => {
    if (zone.zoneId) submittedZoneIds.add(Number(zone.zoneId));
    zone.zoneAisles?.forEach((aisle) => {
      if (aisle.aisleId) submittedAisleIds.add(Number(aisle.aisleId));
      aisle.aisleRacks?.forEach((rack) => {
        if (rack.rackId) submittedRackIds.add(Number(rack.rackId));
        rack.rackLevels?.forEach((level) => {
          if (level.levelId) submittedLevelIds.add(Number(level.levelId));
          level.levelBins?.forEach((bin) => {
            if (bin.binId) submittedBinIds.add(Number(bin.binId));
          });
        });
      });
    });
  });

  await prisma.bin.deleteMany({
    where: {
      binLevelId: { in: Array.from(submittedLevelIds) },
      binId: { notIn: Array.from(submittedBinIds) },
    },
  });

  await prisma.level.deleteMany({
    where: {
      levelRackId: { in: Array.from(submittedRackIds) },
      levelId: { notIn: Array.from(submittedLevelIds) },
    },
  });

  await prisma.rack.deleteMany({
    where: {
      rackAisleId: { in: Array.from(submittedAisleIds) },
      rackId: { notIn: Array.from(submittedRackIds) },
    },
  });

  await prisma.aisle.deleteMany({
    where: {
      aisleZoneId: { in: Array.from(submittedZoneIds) },
      aisleId: { notIn: Array.from(submittedAisleIds) },
    },
  });

  await prisma.zone.deleteMany({
    where: {
      zoneStoreId: storeId,
      zoneId: { notIn: Array.from(submittedZoneIds) },
    },
  });

  for (const zone of storeZones) {
    if (zone.zoneId) {
      await prisma.zone.update({
        where: { zoneId: Number(zone.zoneId) },
        data: {
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription,
          zoneStatus: zone.zoneStatus,
          zoneUpdateAt: getLocalNow(),
          zoneUpdateBy: storeUpdateBy,
        },
      });

      for (const aisle of zone.zoneAisles || []) {
        if (aisle.aisleId) {
          await prisma.aisle.update({
            where: { aisleId: Number(aisle.aisleId) },
            data: {
              aisleCode: aisle.aisleCode,
              aisleName: aisle.aisleName,
              aisleDescription: aisle.aisleDescription,
              aisleUpdateAt: getLocalNow(),
              aisleUpdateBy: storeUpdateBy,
            },
          });
        } else {
          await prisma.aisle.create({
            data: {
              aisleZoneId: Number(zone.zoneId),
              aisleCode: aisle.aisleCode,
              aisleName: aisle.aisleName,
              aisleDescription: aisle.aisleDescription,
              aisleCreateAt: getLocalNow(),
              aisleCreateBy: storeUpdateBy,
            },
          });
        }

        for (const rack of aisle.aisleRacks || []) {
          if (rack.rackId) {
            await prisma.rack.update({
              where: { rackId: Number(rack.rackId) },
              data: {
                rackCode: rack.rackCode,
                rackName: rack.rackName,
                rackDescription: rack.rackDescription,
                rackUpdateAt: getLocalNow(),
                rackUpdateBy: storeUpdateBy,
              },
            });
          } else {
            const createdAisle = aisle.aisleId
              ? { connect: { aisleId: Number(aisle.aisleId) } }
              : {
                  create: {
                    aisleZoneId: Number(zone.zoneId),
                    aisleCode: aisle.aisleCode,
                    aisleName: aisle.aisleName,
                    aisleDescription: aisle.aisleDescription,
                    aisleCreateAt: getLocalNow(),
                    aisleCreateBy: storeUpdateBy,
                  },
                };

            await prisma.rack.create({
              data: {
                rackAisleId: Number(aisle.aisleId),
                rackCode: rack.rackCode,
                rackName: rack.rackName,
                rackDescription: rack.rackDescription,
                rackCreateAt: getLocalNow(),
                rackCreateBy: storeUpdateBy,
              },
            });
          }

          for (const level of rack.rackLevels || []) {
            if (level.levelId) {
              await prisma.level.update({
                where: { levelId: Number(level.levelId) },
                data: {
                  levelCode: level.levelCode,
                  levelName: level.levelName,
                  levelDescription: level.levelDescription,
                  levelUpdateAt: getLocalNow(),
                  levelUpdateBy: storeUpdateBy,
                },
              });
            } else {
              await prisma.level.create({
                data: {
                  levelRackId: Number(rack.rackId),
                  levelCode: level.levelCode,
                  levelName: level.levelName,
                  levelDescription: level.levelDescription,
                  levelCreateAt: getLocalNow(),
                  levelCreateBy: storeUpdateBy,
                },
              });
            }

            for (const bin of level.levelBins || []) {
              if (bin.binId) {
                await prisma.bin.update({
                  where: { binId: Number(bin.binId) },
                  data: {
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
                    binUpdateAt: getLocalNow(),
                    binUpdateBy: storeUpdateBy,
                  },
                });
              } else {
                await prisma.bin.create({
                  data: {
                    binLevelId: Number(level.levelId),
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
                    binCreateBy: storeUpdateBy,
                  },
                });
              }
            }
          }
        }
      }
    } else {
      await prisma.zone.create({
        data: {
          zoneStoreId: storeId,
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription,
          zoneStatus: zone.zoneStatus,
          zoneCreateAt: getLocalNow(),
          zoneCreateBy: storeUpdateBy,
          zoneAisles: {
            create:
              zone.zoneAisles?.map((aisle) => ({
                aisleCode: aisle.aisleCode,
                aisleName: aisle.aisleName,
                aisleDescription: aisle.aisleDescription,
                aisleCreateAt: getLocalNow(),
                aisleCreateBy: storeUpdateBy,
                aisleRacks: {
                  create:
                    aisle.aisleRacks?.map((rack) => ({
                      rackCode: rack.rackCode,
                      rackName: rack.rackName,
                      rackDescription: rack.rackDescription,
                      rackCreateAt: getLocalNow(),
                      rackCreateBy: storeUpdateBy,
                      rackLevels: {
                        create:
                          rack.rackLevels?.map((level) => ({
                            levelCode: level.levelCode,
                            levelName: level.levelName,
                            levelDescription: level.levelDescription,
                            levelCreateAt: getLocalNow(),
                            levelCreateBy: storeUpdateBy,
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
                                  binCreateBy: storeUpdateBy,
                                })) || [],
                            },
                          })) || [],
                      },
                    })) || [],
                },
              })) || [],
          },
        },
      });
    }
  }

  return StoreService.update(storeId, {
    storeCode: normalizedCode,
    storeName: storeName.trim(),
    storeLocation: storeLocation.trim(),
    storeDescription: storeDescription.trim(),
    storeStatus,
    storeUpdateAt: getLocalNow(),
    storeUpdateBy: storeUpdateBy,
  });
}
