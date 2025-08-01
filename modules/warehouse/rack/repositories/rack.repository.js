import prisma from "@/lib/prisma";

export const RackRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.rack.findMany({
      skip,
      take,
      orderBy: { rackCreateAt: "asc" },
      include: {
        rackStore: true,
        rackZone: true,
        rackAisle: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.rack.count(),

  findById: (rackId) =>
    prisma.rack.findUnique({
      where: { rackId },
      include: {
        rackStore: true,
        rackZone: true,
        rackAisle: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (rackName, storeId, zoneId, aisleId) =>
    prisma.rack.findFirst({
      where: {
        rackStoreId: storeId,
        rackZoneId: zoneId,
        rackAisleId: aisleId,
        rackName: rackName.trim().toLowerCase(),
      },
    }),

  create: (data) => prisma.rack.create({ data }),

  update: (rackId, data) =>
    prisma.rack.update({
      where: { rackId },
      data,
    }),
};
