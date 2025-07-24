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

  const normalizedName = parsed.data.customerName.trim().toLowerCase();
  const duplicate = await CustomerValidator.isDuplicateCustomerName(normalizedName);
  if (duplicate) {
    throw { status: 409, message: `Customer '${normalizedName}' already exists` };
  }

  return CustomerService.create({
    ...parsed.data,
    customerName: normalizedName,
    customerCreateAt: getLocalNow(),
  });
}
