import { StoreRepository } from "../repositories/store.repository";

export const StoreValidator = {
  async isDuplicateStoreCode(storeCode) {
    const store = await StoreRepository.findByCode(storeCode);
    return !!store;
  },
};