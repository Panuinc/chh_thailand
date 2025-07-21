import prisma from "@/lib/prisma";

export const UserRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.user.findMany({
      skip,
      take,
      orderBy: { userCreateAt: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.user.count(),

  findById: (userId) =>
    prisma.user.findUnique({
      where: { userId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByEmail: (userEmail) =>
    prisma.user.findFirst({
      where: { userEmail: userEmail.trim().toLowerCase() },
    }),

  create: (data) => prisma.user.create({ data }),

  update: (userId, data) =>
    prisma.user.update({
      where: { userId },
      data,
    }),

  createAuth: (data) => prisma.userAuth.create({ data }),

  createJob: (data) => prisma.useJob.create({ data }),

  updateJob: async (userId, data) => {
    const currentJob = await prisma.useJob.findFirst({
      where: { useJobUserId: userId, useJobIsCurrent: true },
    });

    if (!currentJob) throw new Error("No current job found");

    return prisma.useJob.update({
      where: { useJobId: currentJob.useJobId },
      data,
    });
  },
};
