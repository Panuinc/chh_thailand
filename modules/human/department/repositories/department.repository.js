import prisma from "@/lib/prisma";

export const DepartmentRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.department.findMany({
      skip,
      take,
      orderBy: { departmentCreateAt: "asc" },
      include: {
        division: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.department.count(),

  findById: (departmentId) =>
    prisma.department.findUnique({
      where: { departmentId },
      include: {
        division: true,
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (departmentName, divisionId) =>
    prisma.department.findFirst({
      where: {
        departmentDivisionId: divisionId,
        departmentName: departmentName.trim().toLowerCase(),
      },
    }),

  create: (data) => prisma.department.create({ data }),

  update: (departmentId, data) =>
    prisma.department.update({
      where: { departmentId },
      data,
    }),
};
