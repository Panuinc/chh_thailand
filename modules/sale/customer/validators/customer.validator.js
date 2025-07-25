import { CustomerRepository } from "../repositories/customer.repository";

export const CustomerValidator = {
  async isDuplicateCustomerTaxBranch(tax, branch) {
    const customer = await CustomerRepository.findByTaxAndBranch(tax, branch);
    return !!customer;
  },
};
