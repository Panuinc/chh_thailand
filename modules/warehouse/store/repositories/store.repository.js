import prisma from "@/lib/prisma";

export const StoreRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.store.findMany({
      skip,
      take,
      orderBy: { storeCode: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
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
                    rackLevels: { include: { levelBins: true } },
                  },
                },
              },
            },
          },
        },
      },
    }),

  findByCode: (storeCode) =>
    prisma.store.findUnique({
      where: { storeCode: storeCode.trim().toUpperCase() },
    }),

  createNested: (data) =>
    prisma.store.create({
      data,
      include: {
        storeZones: {
          include: {
            zoneAisles: {
              include: {
                aisleRacks: {
                  include: { rackLevels: { include: { levelBins: true } } },
                },
              },
            },
          },
        },
      },
    }),

  replaceNested: (storeId, data) =>
    prisma.$transaction([
      prisma.zone.deleteMany({ where: { zoneStoreId: storeId } }),
      prisma.store.update({ where: { storeId }, data }),
    ]),
};
