import { RackRepository } from "../repositories/rack.repository";

export class RackService {
  static getAllPaginated(skip, take) {
    return RackRepository.getAll(skip, take);
  }

  static countAll() {
    return RackRepository.countAll();
  }

  static getById(rackId) {
    return RackRepository.findById(rackId);
  }

  static getByName(rackName, storeId, zoneId, aisleId) {
    return RackRepository.findByName(rackName, storeId, zoneId, aisleId);
  }

  static create(data) {
    return RackRepository.create(data);
  }

  static update(rackId, data) {
    return RackRepository.update(rackId, data);
  }
}
