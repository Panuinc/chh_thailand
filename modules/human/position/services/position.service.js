import { PositionRepository } from "../repositories/position.repository";

export class PositionService {
  static getAllPaginated(skip, take) {
    return PositionRepository.getAll(skip, take);
  }

  static countAll() {
    return PositionRepository.countAll();
  }

  static getById(positionId) {
    return PositionRepository.findById(positionId);
  }

  static getByName(positionName) {
    return PositionRepository.findByName(positionName);
  }

  static create(data) {
    return PositionRepository.create(data);
  }

  static update(positionId, data) {
    return PositionRepository.update(positionId, data);
  }
}
