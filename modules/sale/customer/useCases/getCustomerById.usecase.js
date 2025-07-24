import { CustomerService } from "../services/customer.service";

export async function GetCustomerByIdUseCase(customerId) {
  const id = parseInt(customerId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid customer ID" };

  const customer = await CustomerService.getById(id);
  if (!customer) throw { status: 404, message: "Customer not found" };

  return customer;
}
