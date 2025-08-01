import prisma from "@/lib/prisma";

export const BinRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.bin.findMany({
      skip,
      take,
      orderBy: { binCreateAt: "asc" },
      include: {
        binStore: true,
        binZone: true,
        binAisle: true,
        binRack: true,
        binLevel: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.bin.count(),

  findById: (binId) =>
    prisma.bin.findUnique({
      where: { binId },
      include: {
        binStore: true,
        binZone: true,
        binAisle: true,
        binRack: true,
        binLevel: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (name, storeId, zoneId, aisleId, rackId, levelId) =>
    prisma.bin.findFirst({
      where: {
        binName: name,
        binStoreId: storeId,
        binZoneId: zoneId,
        binAisleId: aisleId,
        binRackId: rackId,
        binLevelId: levelId,
      },
    }),

  create: (data) => prisma.bin.create({ data }),

  update: (binId, data) =>
    prisma.bin.update({
      where: { binId },
      data,
    }),
};
