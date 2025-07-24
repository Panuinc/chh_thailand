import { customerPutSchema } from "../schemas/customer.schema";
import { CustomerService } from "../services/customer.service";
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

  return CustomerService.update(parsed.data.customerId, {
    ...parsed.data,
    customerName: parsed.data.customerName.trim().toLowerCase(),
    customerUpdateAt: getLocalNow(),
  });
}
