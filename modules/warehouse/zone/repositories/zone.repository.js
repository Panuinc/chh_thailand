import prisma from "@/lib/prisma";

export const ZoneRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.zone.findMany({
      skip,
      take,
      orderBy: { zoneCreateAt: "asc" },
      include: {
        zoneStore: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.zone.count(),

  findById: (zoneId) =>
    prisma.zone.findUnique({
      where: { zoneId },
      include: {
        zoneStore: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (zoneName, storeId) =>
    prisma.zone.findFirst({
      where: {
        zoneStoreId: storeId,
        zoneName: zoneName.trim().toLowerCase(),
      },
    }),

  create: (data) => prisma.zone.create({ data }),

  update: (zoneId, data) =>
    prisma.zone.update({
      where: { zoneId },
      data,
    }),
};
