import prisma from "@/lib/prisma";

export const DivisionRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.division.findMany({
      skip,
      take,
      orderBy: { divisionCreateAt: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.division.count(),

  findById: (divisionId) =>
    prisma.division.findUnique({
      where: { divisionId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (divisionName) =>
    prisma.division.findFirst({
      where: { divisionName: divisionName.trim().toLowerCase() },
    }),

  create: (data) => prisma.division.create({ data }),

  update: (divisionId, data) =>
    prisma.division.update({
      where: { divisionId },
      data,
    }),
};
