import { customerPutSchema } from "../schemas/customer.schema";
import { CustomerService } from "../services/customer.service";
import { CustomerValidator } from "../validators/customer.validator";
import { getLocalNow } from "@/lib/getLocalNow";
import prisma from "@/lib/prisma";

export async function UpdateCustomerUseCase(data) {
  if (typeof data.customerLeaders === "string") {
    try {
      data.customerLeaders = JSON.parse(data.customerLeaders);
    } catch (e) {
      data.customerLeaders = [];
    }
  }

  const parsed = customerPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    customerId,
    customerLeaders,
    customerUpdateBy,
    customerTax,
    customerBranch,
    customerName,
    customerAddress,
    customerPhone,
    customerType,
    customerStatus,
  } = parsed.data;

  const existing = await CustomerService.getById(customerId);
  if (!existing) {
    throw { status: 404, message: "Customer not found" };
  }

  const normalizedTax = customerTax.trim();
  const normalizedBranch = customerBranch.trim();

  if (
    normalizedTax !== existing.customerTax ||
    normalizedBranch !== existing.customerBranch
  ) {
    const duplicate = await CustomerValidator.isDuplicateCustomerTaxBranch(
      normalizedTax,
      normalizedBranch
    );
    if (duplicate) {
      throw {
        status: 409,
        message: `Customer with Tax ID '${normalizedTax}' and Branch '${normalizedBranch}' already exists`,
      };
    }
  }

  const currentLeaders = await prisma.customerLeader.findMany({
    where: { customerId },
  });

  const submittedIds = new Set(
    customerLeaders
      .map((l) => Number(l.customerLeaderId))
      .filter((id) => Number.isInteger(id) && id > 0)
  );

  const toDelete = currentLeaders.filter(
    (leader) => !submittedIds.has(leader.customerLeaderId)
  );

  await prisma.customerLeader.deleteMany({
    where: {
      customerLeaderId: { in: toDelete.map((l) => l.customerLeaderId) },
    },
  });

  for (const leader of customerLeaders) {
    if (leader.customerLeaderId) {
      await prisma.customerLeader.update({
        where: { customerLeaderId: Number(leader.customerLeaderId) },
        data: {
          customerLeaderName: leader.customerLeaderName,
          customerLeaderEmail: leader.customerLeaderEmail,
          customerLeaderPhone: leader.customerLeaderPhone,
          customerLeaderIsDecisionMaker: leader.customerLeaderIsDecisionMaker,
          customerLeaderUpdateBy: customerUpdateBy,
          customerLeaderUpdateAt: getLocalNow(),
        },
      });
    } else {
      await prisma.customerLeader.create({
        data: {
          customerId,
          customerLeaderName: leader.customerLeaderName,
          customerLeaderEmail: leader.customerLeaderEmail,
          customerLeaderPhone: leader.customerLeaderPhone,
          customerLeaderIsDecisionMaker: leader.customerLeaderIsDecisionMaker,
          customerLeaderCreateBy: customerUpdateBy,
          customerLeaderCreateAt: getLocalNow(),
        },
      });
    }
  }

  return CustomerService.update(customerId, {
    customerTax: normalizedTax,
    customerName: customerName.trim(),
    customerBranch: normalizedBranch,
    customerAddress: customerAddress.trim(),
    customerPhone: customerPhone.trim(),
    customerType,
    customerStatus,
    customerUpdateAt: getLocalNow(),
    updatedBy: {
      connect: { userId: customerUpdateBy },
    },
  });
}
