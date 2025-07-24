import { CustomerRepository } from "../repositories/customer.repository";

export const CustomerValidator = {
  async isDuplicateCustomerName(name) {
    const customer = await CustomerRepository.findByName(name);
    return !!customer;
  },
};
