import { StoreRepository } from "../repositories/store.repository";

export const StoreValidator = {
  async isDuplicateStoreCode(code) {
    const store = await StoreRepository.findByCode(code);
    return !!store;
  },
  
  async isDuplicateStoreCodeExceptSelf(code, selfId) {
    const store = await StoreRepository.findByCode(code);
    return store && store.storeId !== selfId;
  },
};
