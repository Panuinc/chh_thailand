import { RackRepository } from "../repositories/rack.repository";

export const RackValidator = {
  async isDuplicateRackName(name, storeId, zoneId, aisleId) {
    const rack = await RackRepository.findByName(name, storeId, zoneId, aisleId);
    return !!rack;
  },

  async isDuplicateRackNameExceptSelf(name, storeId, zoneId, aisleId, selfId) {
    const rack = await RackRepository.findByName(name, storeId, zoneId, aisleId);
    return rack && rack.rackId !== selfId;
  },
};
