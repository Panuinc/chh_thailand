import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";
import prisma from "@/lib/prisma";

export async function UpdateStoreUseCase(data) {
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

  const parsed = storePutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const { storeId, storeZones, ...rest } = parsed.data;

  const existing = await StoreService.getById(storeId);
  if (!existing) throw { status: 404, message: "Store not found" };

  const normalizedCode = rest.storeCode.trim().toLowerCase();
  const duplicateCode = await StoreValidator.isDuplicateStoreCodeExceptSelf(
    normalizedCode,
    storeId
  );
  if (duplicateCode)
    throw {
      status: 409,
      message: `Store code '${normalizedCode}' already exists`,
    };

  await prisma.store.update({
    where: { storeId },
    data: {
      ...rest,
      storeCode: normalizedCode,
      storeName: rest.storeName.trim().toLowerCase(),
      storeUpdateAt: getLocalNow(),
    },
  });

  const existingZones = await prisma.zone.findMany({
    where: { zoneStoreId: storeId },
    include: {
      zoneAisles: {
        include: {
          aisleRacks: {
            include: { rackLevels: { include: { levelBins: true } } },
          },
        },
      },
    },
  });

  const zoneMap = new Map(existingZones.map((z) => [z.zoneId, z]));

  const incomingZoneIds = (storeZones || [])
    .filter((z) => z.zoneId)
    .map((z) => z.zoneId);
  const zoneIdsToDelete = existingZones
    .filter((z) => !incomingZoneIds.includes(z.zoneId))
    .map((z) => z.zoneId);

  if (zoneIdsToDelete.length) {
    const aislesToDelete = await prisma.aisle.findMany({
      where: { aisleZoneId: { in: zoneIdsToDelete } },
      select: { aisleId: true },
    });
    const aisleIds = aislesToDelete.map((a) => a.aisleId);

    if (aisleIds.length) {
      const racks = await prisma.rack.findMany({
        where: { rackAisleId: { in: aisleIds } },
        select: { rackId: true },
      });
      const rackIds = racks.map((r) => r.rackId);

      if (rackIds.length) {
        const levels = await prisma.level.findMany({
          where: { levelRackId: { in: rackIds } },
          select: { levelId: true },
        });
        const levelIds = levels.map((l) => l.levelId);

        if (levelIds.length) {
          await prisma.bin.deleteMany({
            where: { binLevelId: { in: levelIds } },
          });
          await prisma.level.deleteMany({
            where: { levelId: { in: levelIds } },
          });
        }
        await prisma.rack.deleteMany({ where: { rackId: { in: rackIds } } });
      }
      await prisma.aisle.deleteMany({ where: { aisleId: { in: aisleIds } } });
    }
    await prisma.zone.deleteMany({
      where: { zoneId: { in: zoneIdsToDelete } },
    });
  }

  for (const zone of storeZones || []) {
    if (zone.zoneId) {
      await prisma.zone.update({
        where: { zoneId: zone.zoneId },
        data: {
          zoneCode: zone.zoneCode.trim().toLowerCase(),
          zoneName: zone.zoneName.trim().toLowerCase(),
          zoneDescription: zone.zoneDescription,
          zonePosX: zone.zonePosX,
          zonePosY: zone.zonePosY,
          zoneStatus: zone.zoneStatus,
        },
      });

      const existingAisles = zoneMap.get(zone.zoneId)?.zoneAisles || [];
      const aisleMap = new Map(existingAisles.map((a) => [a.aisleId, a]));

      const incomingAisleIds = (zone.zoneAisles || [])
        .filter((a) => a.aisleId)
        .map((a) => a.aisleId);
      const aisleIdsToDelete = existingAisles
        .filter((a) => !incomingAisleIds.includes(a.aisleId))
        .map((a) => a.aisleId);

      if (aisleIdsToDelete.length) {
        const racks = await prisma.rack.findMany({
          where: { rackAisleId: { in: aisleIdsToDelete } },
          select: { rackId: true },
        });
        const rackIds = racks.map((r) => r.rackId);
        if (rackIds.length) {
          const levels = await prisma.level.findMany({
            where: { levelRackId: { in: rackIds } },
            select: { levelId: true },
          });
          const levelIds = levels.map((l) => l.levelId);
          if (levelIds.length) {
            await prisma.bin.deleteMany({
              where: { binLevelId: { in: levelIds } },
            });
            await prisma.level.deleteMany({
              where: { levelId: { in: levelIds } },
            });
          }
          await prisma.rack.deleteMany({ where: { rackId: { in: rackIds } } });
        }
        await prisma.aisle.deleteMany({
          where: { aisleId: { in: aisleIdsToDelete } },
        });
      }

      for (const aisle of zone.zoneAisles || []) {
        if (aisle.aisleId) {
          await prisma.aisle.update({
            where: { aisleId: aisle.aisleId },
            data: {
              aisleCode: aisle.aisleCode.trim().toLowerCase(),
              aisleName: aisle.aisleName.trim().toLowerCase(),
              aisleDescription: aisle.aisleDescription,
              aislePosX: aisle.aislePosX,
              aislePosY: aisle.aislePosY,
              aisleStatus: aisle.aisleStatus,
            },
          });

          const existingRacks = aisleMap.get(aisle.aisleId)?.aisleRacks || [];
          const rackMap = new Map(existingRacks.map((r) => [r.rackId, r]));

          const incomingRackIds = (aisle.aisleRacks || [])
            .filter((r) => r.rackId)
            .map((r) => r.rackId);
          const rackIdsToDelete = existingRacks
            .filter((r) => !incomingRackIds.includes(r.rackId))
            .map((r) => r.rackId);

          if (rackIdsToDelete.length) {
            const levels = await prisma.level.findMany({
              where: { levelRackId: { in: rackIdsToDelete } },
              select: { levelId: true },
            });
            const levelIds = levels.map((l) => l.levelId);
            if (levelIds.length) {
              await prisma.bin.deleteMany({
                where: { binLevelId: { in: levelIds } },
              });
              await prisma.level.deleteMany({
                where: { levelId: { in: levelIds } },
              });
            }
            await prisma.rack.deleteMany({
              where: { rackId: { in: rackIdsToDelete } },
            });
          }

          for (const r of aisle.aisleRacks || []) {
            const rackBase = {
              rackCode: r.rackCode.trim().toLowerCase(),
              rackName: r.rackName.trim().toLowerCase(),
              rackDescription: r.rackDescription,
              rackPosX: r.rackPosX,
              rackPosY: r.rackPosY,
              rackStatus: r.rackStatus,
            };

            if (r.rackId) {
              await prisma.rack.update({
                where: { rackId: r.rackId },
                data: rackBase,
              });

              const existingLevels = rackMap.get(r.rackId)?.rackLevels || [];
              const levelMap = new Map(
                existingLevels.map((lv) => [lv.levelId, lv])
              );

              const incomingLevelIds = (r.rackLevels || [])
                .filter((lv) => lv.levelId)
                .map((lv) => lv.levelId);
              const levelIdsToDelete = existingLevels
                .filter((lv) => !incomingLevelIds.includes(lv.levelId))
                .map((lv) => lv.levelId);

              if (levelIdsToDelete.length) {
                await prisma.bin.deleteMany({
                  where: { binLevelId: { in: levelIdsToDelete } },
                });
                await prisma.level.deleteMany({
                  where: { levelId: { in: levelIdsToDelete } },
                });
              }

              for (const lv of r.rackLevels || []) {
                const levelBase = {
                  levelCode: lv.levelCode.trim().toLowerCase(),
                  levelName: lv.levelName.trim().toLowerCase(),
                  levelDescription: lv.levelDescription,
                  levelStatus: lv.levelStatus,
                };

                if (lv.levelId) {
                  await prisma.level.update({
                    where: { levelId: lv.levelId },
                    data: levelBase,
                  });
                  const existingBins = await prisma.bin.findMany({
                    where: { binLevelId: lv.levelId },
                    select: { binId: true },
                  });
                  const existingBinIds = existingBins.map((b) => b.binId);
                  const incomingBinIds = (lv.levelBins || [])
                    .filter((b) => b.binId)
                    .map((b) => b.binId);
                  const binIdsToDelete = existingBinIds.filter(
                    (id) => !incomingBinIds.includes(id)
                  );

                  if (binIdsToDelete.length) {
                    await prisma.bin.deleteMany({
                      where: { binId: { in: binIdsToDelete } },
                    });
                  }

                  for (const b of lv.levelBins || []) {
                    const binBase = {
                      binCode: b.binCode.trim().toLowerCase(),
                      binName: b.binName.trim().toLowerCase(),
                      binDescription: b.binDescription,
                      binRow: b.binRow,
                      binType: b.binType,
                      binUsage: b.binUsage,
                      binCapacity: b.binCapacity,
                      binRfidTagId: b.binRfidTagId.trim().toLowerCase(),
                      binOccupancy: b.binOccupancy,
                      binFillRate: b.binFillRate,
                      binPosX: b.binPosX,
                      binPosY: b.binPosY,
                      binWidth: b.binWidth,
                      binHeight: b.binHeight,
                      binDepth: b.binDepth,
                      binStatus: b.binStatus,
                    };
                    if (b.binId) {
                      await prisma.bin.update({
                        where: { binId: b.binId },
                        data: binBase,
                      });
                    } else {
                      await prisma.bin.create({
                        data: { ...binBase, binLevelId: lv.levelId },
                      });
                    }
                  }
                } else {
                  const createdLevel = await prisma.level.create({
                    data: { ...levelBase, levelRackId: r.rackId },
                  });
                  for (const b of lv.levelBins || []) {
                    await prisma.bin.create({
                      data: {
                        binLevelId: createdLevel.levelId,
                        binCode: b.binCode.trim().toLowerCase(),
                        binName: b.binName.trim().toLowerCase(),
                        binDescription: b.binDescription,
                        binRow: b.binRow,
                        binType: b.binType,
                        binUsage: b.binUsage,
                        binCapacity: b.binCapacity,
                        binRfidTagId: b.binRfidTagId.trim().toLowerCase(),
                        binOccupancy: b.binOccupancy,
                        binFillRate: b.binFillRate,
                        binPosX: b.binPosX,
                        binPosY: b.binPosY,
                        binWidth: b.binWidth,
                        binHeight: b.binHeight,
                        binDepth: b.binDepth,
                        binStatus: b.binStatus,
                      },
                    });
                  }
                }
              }
            } else {
              const createdRack = await prisma.rack.create({
                data: { ...rackBase, rackAisleId: aisle.aisleId },
              });

              for (const lv of r.rackLevels || []) {
                const createdLevel = await prisma.level.create({
                  data: {
                    levelRackId: createdRack.rackId,
                    levelCode: lv.levelCode.trim().toLowerCase(),
                    levelName: lv.levelName.trim().toLowerCase(),
                    levelDescription: lv.levelDescription,
                    levelStatus: lv.levelStatus,
                  },
                });

                for (const b of lv.levelBins || []) {
                  await prisma.bin.create({
                    data: {
                      binLevelId: createdLevel.levelId,
                      binCode: b.binCode.trim().toLowerCase(),
                      binName: b.binName.trim().toLowerCase(),
                      binDescription: b.binDescription,
                      binRow: b.binRow,
                      binType: b.binType,
                      binUsage: b.binUsage,
                      binCapacity: b.binCapacity,
                      binRfidTagId: b.binRfidTagId.trim().toLowerCase(),
                      binOccupancy: b.binOccupancy,
                      binFillRate: b.binFillRate,
                      binPosX: b.binPosX,
                      binPosY: b.binPosY,
                      binWidth: b.binWidth,
                      binHeight: b.binHeight,
                      binDepth: b.binDepth,
                      binStatus: b.binStatus,
                    },
                  });
                }
              }
            }
          }
        } else {
          const createdAisle = await prisma.aisle.create({
            data: {
              aisleZoneId: zone.zoneId,
              aisleCode: aisle.aisleCode.trim().toLowerCase(),
              aisleName: aisle.aisleName.trim().toLowerCase(),
              aisleDescription: aisle.aisleDescription,
              aislePosX: aisle.aislePosX,
              aislePosY: aisle.aislePosY,
              aisleStatus: aisle.aisleStatus,
            },
          });

          for (const r of aisle.aisleRacks || []) {
            const createdRack = await prisma.rack.create({
              data: {
                rackAisleId: createdAisle.aisleId,
                rackCode: r.rackCode.trim().toLowerCase(),
                rackName: r.rackName.trim().toLowerCase(),
                rackDescription: r.rackDescription,
                rackPosX: r.rackPosX,
                rackPosY: r.rackPosY,
                rackStatus: r.rackStatus,
              },
            });

            for (const lv of r.rackLevels || []) {
              const createdLevel = await prisma.level.create({
                data: {
                  levelRackId: createdRack.rackId,
                  levelCode: lv.levelCode.trim().toLowerCase(),
                  levelName: lv.levelName.trim().toLowerCase(),
                  levelDescription: lv.levelDescription,
                  levelStatus: lv.levelStatus,
                },
              });

              for (const b of lv.levelBins || []) {
                await prisma.bin.create({
                  data: {
                    binLevelId: createdLevel.levelId,
                    binCode: b.binCode.trim().toLowerCase(),
                    binName: b.binName.trim().toLowerCase(),
                    binDescription: b.binDescription,
                    binRow: b.binRow,
                    binType: b.binType,
                    binUsage: b.binUsage,
                    binCapacity: b.binCapacity,
                    binRfidTagId: b.binRfidTagId.trim().toLowerCase(),
                    binOccupancy: b.binOccupancy,
                    binFillRate: b.binFillRate,
                    binPosX: b.binPosX,
                    binPosY: b.binPosY,
                    binWidth: b.binWidth,
                    binHeight: b.binHeight,
                    binDepth: b.binDepth,
                    binStatus: b.binStatus,
                  },
                });
              }
            }
          }
        }
      }
    } else {
      const createdZone = await prisma.zone.create({
        data: {
          zoneCode: zone.zoneCode.trim().toLowerCase(),
          zoneName: zone.zoneName.trim().toLowerCase(),
          zoneDescription: zone.zoneDescription,
          zonePosX: zone.zonePosX,
          zonePosY: zone.zonePosY,
          zoneStatus: zone.zoneStatus,
          zoneStoreId: storeId,
        },
      });

      for (const aisle of zone.zoneAisles || []) {
        const createdAisle = await prisma.aisle.create({
          data: {
            aisleZoneId: createdZone.zoneId,
            aisleCode: aisle.aisleCode.trim().toLowerCase(),
            aisleName: aisle.aisleName.trim().toLowerCase(),
            aisleDescription: aisle.aisleDescription,
            aislePosX: aisle.aislePosX,
            aislePosY: aisle.aislePosY,
            aisleStatus: aisle.aisleStatus,
          },
        });

        for (const r of aisle.aisleRacks || []) {
          const createdRack = await prisma.rack.create({
            data: {
              rackAisleId: createdAisle.aisleId,
              rackCode: r.rackCode.trim().toLowerCase(),
              rackName: r.rackName.trim().toLowerCase(),
              rackDescription: r.rackDescription,
              rackPosX: r.rackPosX,
              rackPosY: r.rackPosY,
              rackStatus: r.rackStatus,
            },
          });

          for (const lv of r.rackLevels || []) {
            const createdLevel = await prisma.level.create({
              data: {
                levelRackId: createdRack.rackId,
                levelCode: lv.levelCode.trim().toLowerCase(),
                levelName: lv.levelName.trim().toLowerCase(),
                levelDescription: lv.levelDescription,
                levelStatus: lv.levelStatus,
              },
            });

            for (const b of lv.levelBins || []) {
              await prisma.bin.create({
                data: {
                  binLevelId: createdLevel.levelId,
                  binCode: b.binCode.trim().toLowerCase(),
                  binName: b.binName.trim().toLowerCase(),
                  binDescription: b.binDescription,
                  binRow: b.binRow,
                  binType: b.binType,
                  binUsage: b.binUsage,
                  binCapacity: b.binCapacity,
                  binRfidTagId: b.binRfidTagId.trim().toLowerCase(),
                  binOccupancy: b.binOccupancy,
                  binFillRate: b.binFillRate,
                  binPosX: b.binPosX,
                  binPosY: b.binPosY,
                  binWidth: b.binWidth,
                  binHeight: b.binHeight,
                  binDepth: b.binDepth,
                  binStatus: b.binStatus,
                },
              });
            }
          }
        }
      }
    }
  }

  return { success: true };
}
