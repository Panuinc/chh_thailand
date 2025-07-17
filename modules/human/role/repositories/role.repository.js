import prisma from "@/lib/prisma";

export const RoleRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.role.findMany({
      skip,
      take,
      orderBy: { roleCreateAt: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.role.count(),

  findById: (roleId) =>
    prisma.role.findUnique({
      where: { roleId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByName: (roleName) =>
    prisma.role.findFirst({
      where: { roleName: roleName.trim().toLowerCase() },
    }),

  create: (data) => prisma.role.create({ data }),

  update: (roleId, data) =>
    prisma.role.update({
      where: { roleId },
      data,
    }),
};
