import { CustomerService } from "../services/customer.service";

export async function GetAllCustomerUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const customers = await CustomerService.getAllPaginated(skip, limit);
  const total = await CustomerService.countAll();

  return { customers, total };
}
