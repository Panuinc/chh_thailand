import { BinRepository } from "../repositories/bin.repository";

export const BinValidator = {
  async isDuplicateBinName(name, storeId, zoneId, aisleId, rackId, levelId) {
    const bin = await BinRepository.findByName(name, storeId, zoneId, aisleId, rackId, levelId);
    return !!bin;
  },

  async isDuplicateBinNameExceptSelf(name, storeId, zoneId, aisleId, rackId, levelId, selfId) {
    const bin = await BinRepository.findByName(name, storeId, zoneId, aisleId, rackId, levelId);
    return bin && bin.binId !== selfId;
  },
};
