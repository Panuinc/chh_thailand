import { customerPutSchema } from "../schemas/customer.schema";
import { CustomerService } from "../services/customer.service";
import { CustomerValidator } from "../validators/customer.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateCustomerUseCase(data) {
  const parsed = customerPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await CustomerService.getById(parsed.data.customerId);
  if (!existing) {
    throw { status: 404, message: "Customer not found" };
  }

  const normalizedTax = parsed.data.customerTax.trim();
  const normalizedBranch = parsed.data.customerBranch.trim();

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

  return CustomerService.update(parsed.data.customerId, {
    ...parsed.data,
    customerTax: normalizedTax,
    customerName: parsed.data.customerName.trim(),
    customerUpdateAt: getLocalNow(),
  });
}
