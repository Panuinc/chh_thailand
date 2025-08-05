import prisma from "@/lib/prisma";

export const DoorRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.door.findMany({
      skip,
      take,
      orderBy: { doorCreateAt: "asc" },
      include: {
        customer: true,
        userSale: { select: { userFirstName: true, userLastName: true } },
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        grooveLines: true,
        hinges: true,
        locks: true,
        louvers: true,
        glassPanels: true,
        peepHole: true,
        skeleton: {
          include: {
            rails: true,
            stiles: true,
            lockSet: true,
          },
        },
      },
    }),

  countAll: () => prisma.door.count(),

  findById: (doorId) =>
    prisma.door.findUnique({
      where: { doorId },
      include: {
        customer: true,
        userSale: { select: { userFirstName: true, userLastName: true } },
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        grooveLines: true,
        hinges: true,
        locks: true,
        louvers: true,
        glassPanels: true,
        peepHole: true,
        skeleton: {
          include: {
            rails: true,
            stiles: true,
            lockSet: true,
          },
        },
      },
    }),

  findByName: (doorProjectName) =>
    prisma.door.findFirst({
      where: { doorProjectName: doorProjectName.trim().toLowerCase() },
    }),

  create: (data) => prisma.door.create({ data }),

  update: (doorId, data) =>
    prisma.door.update({
      where: { doorId },
      data,
    }),
};
