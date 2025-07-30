import { PartnerRepository } from "../repositories/partner.repository";

export class PartnerService {
  static getAllPaginated(skip, take) {
    return PartnerRepository.getAll(skip, take);
  }

  static countAll() {
    return PartnerRepository.countAll();
  }

  static getById(partnerId) {
    return PartnerRepository.findById(partnerId);
  }

  static getByName(partnerName) {
    return PartnerRepository.findByName(partnerName);
  }

  static create(data) {
    return PartnerRepository.create(data);
  }

  static update(partnerId, data) {
    return PartnerRepository.update(partnerId, data);
  }
}
