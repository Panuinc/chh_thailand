import { StoreRepository } from "../repositories/store.repository";

export const StoreValidator = {
  async isDuplicateStoreTaxBranch(tax, branch) {
    const store = await StoreRepository.findByTaxAndBranch(tax, branch);
    return !!store;
  },
};
