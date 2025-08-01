import prisma from "@/lib/prisma";

export const StoreRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.store.findMany({
      skip,
      take,
      orderBy: { storeCreateAt: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        storeZones: true,
        storeAisles: true,
        storeRacks: true,
        storeLevels: true,
        storeBins: true,
      },
    }),

  countAll: () => prisma.store.count(),

  findById: (storeId) =>
    prisma.store.findUnique({
      where: { storeId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        storeZones: {
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
                    rackBins: true,
                  },
                },
                aisleLevels: true,
                aisleBins: true,
              },
            },
            zoneRacks: true,
            zoneLevels: true,
            zoneBins: true,
          },
        },
        storeAisles: true,
        storeRacks: true,
        storeLevels: true,
        storeBins: true,
      },
    }),

  findByCode: (storeCode) =>
    prisma.store.findFirst({
      where: { storeCode: storeCode.trim().toLowerCase() },
    }),

  create: (data) => prisma.store.create({ data }),

  update: (storeId, data) =>
    prisma.store.update({
      where: { storeId },
      data,
    }),
};
