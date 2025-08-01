import { LevelRepository } from "../repositories/level.repository";

export const LevelValidator = {
  async isDuplicateLevelName(name, storeId, zoneId, aisleId, rackId) {
    const level = await LevelRepository.findByName(name, storeId, zoneId, aisleId, rackId);
    return !!level;
  },

  async isDuplicateLevelNameExceptSelf(name, storeId, zoneId, aisleId, rackId, selfId) {
    const level = await LevelRepository.findByName(name, storeId, zoneId, aisleId, rackId);
    return level && level.levelId !== selfId;
  },
};
