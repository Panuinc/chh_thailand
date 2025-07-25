import { customerPostSchema } from "../schemas/customer.schema";
import { CustomerService } from "../services/customer.service";
import { CustomerValidator } from "../validators/customer.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateCustomerUseCase(data) {
  if (typeof data.customerLeaders === "string") {
    try {
      data.customerLeaders = JSON.parse(data.customerLeaders);
    } catch (e) {
      data.customerLeaders = [];
    }
  }

  const parsed = customerPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedTax = parsed.data.customerTax.trim();
  const normalizedBranch = parsed.data.customerBranch.trim();

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

  return CustomerService.create({
    customerTax: normalizedTax,
    customerName: parsed.data.customerName.trim(),
    customerBranch: normalizedBranch,
    customerAddress: parsed.data.customerAddress.trim(),
    customerPhone: parsed.data.customerPhone.trim(),
    customerType: parsed.data.customerType,
    customerCreateAt: getLocalNow(),
    createdBy: {
      connect: { userId: parsed.data.customerCreateBy },
    },
    leaders: {
      create:
        parsed.data.customerLeaders?.map((leader) => ({
          ...leader,
          customerLeaderCreateBy: parsed.data.customerCreateBy,
          customerLeaderCreateAt: getLocalNow(),
        })) ?? [],
    },
  });
}
