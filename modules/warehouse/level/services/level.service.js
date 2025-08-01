import { LevelRepository } from "../repositories/level.repository";

export class LevelService {
  static getAllPaginated(skip, take) {
    return LevelRepository.getAll(skip, take);
  }

  static countAll() {
    return LevelRepository.countAll();
  }

  static getById(levelId) {
    return LevelRepository.findById(levelId);
  }

  static getByName(name, storeId, zoneId, aisleId, rackId) {
    return LevelRepository.findByName(name, storeId, zoneId, aisleId, rackId);
  }

  static create(data) {
    return LevelRepository.create(data);
  }

  static update(levelId, data) {
    return LevelRepository.update(levelId, data);
  }
}
