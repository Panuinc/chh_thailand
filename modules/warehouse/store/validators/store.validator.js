import { StoreRepository } from "../repositories/store.repository";

export const StoreValidator = {
  async isDuplicateStoreName(name) {
    const store = await StoreRepository.findByName(name);
    return !!store;
  },
};
