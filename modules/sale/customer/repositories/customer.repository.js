import prisma from "@/lib/prisma";

export const CustomerRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.customer.findMany({
      skip,
      take,
      orderBy: { customerCreateAt: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        leaders: true,
      },
    }),

  countAll: () => prisma.customer.count(),

  findById: (customerId) =>
    prisma.customer.findUnique({
      where: { customerId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
        leaders: true,
      },
    }),

  findByTaxAndBranch: (tax, branch) =>
    prisma.customer.findFirst({
      where: {
        customerTax: tax.trim(),
        customerBranch: branch.trim(),
      },
    }),

  create: (data) => prisma.customer.create({ data }),

  update: (customerId, data) =>
    prisma.customer.update({
      where: { customerId },
      data,
    }),
};
