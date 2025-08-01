import { AisleRepository } from "../repositories/aisle.repository";

export const AisleValidator = {
  async isDuplicateAisleName(name, storeId) {
    const aisle = await AisleRepository.findByName(name, storeId);
    return !!aisle;
  },

  async isDuplicateAisleNameExceptSelf(name, storeId, selfId) {
    const aisle = await AisleRepository.findByName(name, storeId);
    return aisle && aisle.aisleId !== selfId;
  },
};
