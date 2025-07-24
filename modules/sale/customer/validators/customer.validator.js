import { CustomerRepository } from "../repositories/customer.repository";

export const CustomerValidator = {
  async isDuplicateCustomerTax(tax) {
    const customer = await CustomerRepository.findByTax(tax);
    return !!customer;
  },
};
