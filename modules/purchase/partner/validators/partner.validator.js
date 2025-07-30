import { PartnerRepository } from "../repositories/partner.repository";

export const PartnerValidator = {
  async isDuplicatePartnerName(name) {
    const partner = await PartnerRepository.findByName(name);
    return !!partner;
  },
};
