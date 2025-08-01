import { StoreRepository } from "../repositories/store.repository";

export const StoreValidator = {
  async isDuplicateStoreCode(code) {
    const store = await StoreRepository.findByCode(code);
    return !!store;
  },
};
