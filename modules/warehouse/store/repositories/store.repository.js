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
      },
    }),
  countAll: () => prisma.store.count(),

  findById: (storeId) =>
    prisma.store.findUnique({
      where: { storeId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        storeZones: true,
      },
    }),

  findByCode: (storeCode) =>
    prisma.store.findFirst({
      where: {
        storeCode: storeCode.trim(),
      },
    }),

  create: async (data) => {
    return prisma.$transaction(async (prisma) => {
      const store = await prisma.store.create({ data });
      return store;
    });
  },

  update: (storeId, data) =>
    prisma.store.update({
      where: { storeId },
      data,
    }),
};
