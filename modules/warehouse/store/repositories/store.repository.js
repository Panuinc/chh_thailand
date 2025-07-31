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
        zones: true,
      },
    }),

  countAll: () => prisma.store.count(),

  findById: (storeId) =>
    prisma.store.findUnique({
      where: { storeId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        zones: true,
      },
    }),

  findByCode: (storeCode) =>
    prisma.store.findFirst({
      where: {
        storeCode: storeCode.trim(),
      },
    }),

  create: (data) => prisma.store.create({ data }),

  update: (storeId, data) =>
    prisma.store.update({
      where: { storeId },
      data,
    }),
};
