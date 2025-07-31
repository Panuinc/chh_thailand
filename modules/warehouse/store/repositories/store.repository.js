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
        leaders: true,
      },
    }),

  countAll: () => prisma.store.count(),

  findById: (storeId) =>
    prisma.store.findUnique({
      where: { storeId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        leaders: true,
      },
    }),

  findByTaxAndBranch: (tax, branch) =>
    prisma.store.findFirst({
      where: {
        storeTax: tax.trim(),
        storeBranch: branch.trim(),
      },
    }),

  create: (data) => prisma.store.create({ data }),

  update: (storeId, data) =>
    prisma.store.update({
      where: { storeId },
      data,
    }),
};
