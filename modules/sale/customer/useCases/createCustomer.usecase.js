import { customerPostSchema } from "../schemas/customer.schema";
import { CustomerService } from "../services/customer.service";
import { CustomerValidator } from "../validators/customer.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateCustomerUseCase(data) {
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
    ...parsed.data,
    customerTax: normalizedTax,
    customerName: parsed.data.customerName.trim(),
    customerCreateAt: getLocalNow(),
  });
}
