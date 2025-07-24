import prisma from "@/lib/prisma";

export const DoorRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.door.findMany({
      skip,
      take,
      orderBy: { doorCreateAt: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.door.count(),

  findById: (doorId) =>
    prisma.door.findUnique({
      where: { doorId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (doorName) =>
    prisma.door.findFirst({
      where: { doorName: doorName.trim().toLowerCase() },
    }),

  create: (data) => prisma.door.create({ data }),

  update: (doorId, data) =>
    prisma.door.update({
      where: { doorId },
      data,
    }),
};
