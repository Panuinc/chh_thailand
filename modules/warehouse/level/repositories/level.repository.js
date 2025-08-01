import prisma from "@/lib/prisma";

export const LevelRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.level.findMany({
      skip,
      take,
      orderBy: { levelCreateAt: "asc" },
      include: {
        levelStore: true,
        levelZone: true,
        levelAisle: true,
        levelRack: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.level.count(),

  findById: (levelId) =>
    prisma.level.findUnique({
      where: { levelId },
      include: {
        levelStore: true,
        levelZone: true,
        levelAisle: true,
        levelRack: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (name, storeId, zoneId, aisleId, rackId) =>
    prisma.level.findFirst({
      where: {
        levelName: name,
        levelStoreId: storeId,
        levelZoneId: zoneId,
        levelAisleId: aisleId,
        levelRackId: rackId,
      },
    }),

  create: (data) => prisma.level.create({ data }),

  update: (levelId, data) =>
    prisma.level.update({
      where: { levelId },
      data,
    }),
};
