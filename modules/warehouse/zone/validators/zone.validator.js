import { ZoneRepository } from "../repositories/zone.repository";

export const ZoneValidator = {
  async isDuplicateZoneName(name, storeId) {
    const zone = await ZoneRepository.findByName(name, storeId);
    return !!zone;
  },

  async isDuplicateZoneNameExceptSelf(name, storeId, selfId) {
    const zone = await ZoneRepository.findByName(name, storeId);
    return zone && zone.zoneId !== selfId;
  },
};
