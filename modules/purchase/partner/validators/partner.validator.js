import { PartnerRepository } from "../repositories/partner.repository";

export const PartnerValidator = {
  async isDuplicatePartnerNameAndTax(name, taxId) {
    const partner = await PartnerRepository.findByNameAndTax(name, taxId);
    return !!partner;
  },
};
