import { AisleRepository } from "../repositories/aisle.repository";

export const AisleValidator = {
  async isDuplicateAisleName(name, storeId, zoneId) {
    const aisle = await AisleRepository.findByName(name, storeId, zoneId);
    return !!aisle;
  },

  async isDuplicateAisleNameExceptSelf(name, storeId, zoneId, selfId) {
    const aisle = await AisleRepository.findByName(name, storeId, zoneId);
    return aisle && aisle.aisleId !== selfId;
  },
};
