import prisma from "@/lib/prisma";

export const PartnerRepository = {
  getAll: (skip = 0, take = 10) =>
    prisma.partner.findMany({
      skip,
      take,
      orderBy: { partnerCreateAt: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  countAll: () => prisma.partner.count(),

  findById: (partnerId) =>
    prisma.partner.findUnique({
      where: { partnerId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    }),

  findByNameAndTax: (name, taxId) =>
    prisma.partner.findFirst({
      where: {
        partnerName: name.trim().toLowerCase(),
        partnerTaxId: taxId.trim(),
      },
    }),

  create: (data) => prisma.partner.create({ data }),

  update: (partnerId, data) =>
    prisma.partner.update({
      where: { partnerId },
      data,
    }),
};
