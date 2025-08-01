import { BinRepository } from "../repositories/bin.repository";

export class BinService {
  static getAllPaginated(skip, take) {
    return BinRepository.getAll(skip, take);
  }

  static countAll() {
    return BinRepository.countAll();
  }

  static getById(binId) {
    return BinRepository.findById(binId);
  }

  static getByName(name, storeId, zoneId, aisleId, rackId, levelId) {
    return BinRepository.findByName(name, storeId, zoneId, aisleId, rackId, levelId);
  }

  static create(data) {
    return BinRepository.create(data);
  }

  static update(binId, data) {
    return BinRepository.update(binId, data);
  }
}
