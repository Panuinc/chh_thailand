import { AisleRepository } from "../repositories/aisle.repository";

export class AisleService {
  static getAllPaginated(skip, take) {
    return AisleRepository.getAll(skip, take);
  }

  static countAll() {
    return AisleRepository.countAll();
  }

  static getById(aisleId) {
    return AisleRepository.findById(aisleId);
  }

  static getByName(aisleName) {
    return AisleRepository.findByName(aisleName);
  }

  static create(data) {
    return AisleRepository.create(data);
  }

  static update(aisleId, data) {
    return AisleRepository.update(aisleId, data);
  }
}
