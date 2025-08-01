import prisma from "@/lib/prisma";

export const AisleRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.aisle.findMany({
      skip,
      take,
      orderBy: { aisleCreateAt: "asc" },
      include: {
        aisleStore: true,
        aisleZone: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.aisle.count(),

  findById: (aisleId) =>
    prisma.aisle.findUnique({
      where: { aisleId },
      include: {
        aisleStore: true,
        aisleZone: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (aisleName, storeId, zoneId) =>
    prisma.aisle.findFirst({
      where: {
        aisleStoreId: storeId,
        aisleZoneId: zoneId,
        aisleName: aisleName.trim().toLowerCase(),
      },
    }),

  create: (data) => prisma.aisle.create({ data }),

  update: (aisleId, data) =>
    prisma.aisle.update({
      where: { aisleId },
      data,
    }),
};
