import prisma from "@/lib/prisma";

export const PositionRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.position.findMany({
      skip,
      take,
      orderBy: { positionCreateAt: "asc" },
      include: {
        division: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.position.count(),

  findById: (positionId) =>
    prisma.position.findUnique({
      where: { positionId },
      include: {
        division: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (positionName, divisionId) =>
    prisma.position.findFirst({
      where: {
        positionDivisionId: divisionId,
        positionName: positionName.trim().toLowerCase(),
      },
    }),

  create: (data) => prisma.position.create({ data }),

  update: (positionId, data) =>
    prisma.position.update({
      where: { positionId },
      data,
    }),
};
