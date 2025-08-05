import { DoorRepository } from "../repositories/door.repository";

export class DoorService {
  static getAllPaginated(skip, take) {
    return DoorRepository.getAll(skip, take);
  }

  static countAll() {
    return DoorRepository.countAll();
  }

  static getById(doorId) {
    return DoorRepository.findById(doorId);
  }

  static getByName(doorProjectName) {
    return DoorRepository.findByName(doorProjectName);
  }

  static create(data) {
    return DoorRepository.create(data);
  }

  static update(doorId, data) {
    return DoorRepository.update(doorId, data);
  }
}
