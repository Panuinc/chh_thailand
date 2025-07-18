import { DivisionRepository } from "../repositories/division.repository";

export class DivisionService {
  static getAllPaginated(skip, take) {
    return DivisionRepository.getAll(skip, take);
  }

  static countAll() {
    return DivisionRepository.countAll();
  }

  static getById(divisionId) {
    return DivisionRepository.findById(divisionId);
  }

  static getByName(divisionName) {
    return DivisionRepository.findByName(divisionName);
  }

  static create(data) {
    return DivisionRepository.create(data);
  }

  static update(divisionId, data) {
    return DivisionRepository.update(divisionId, data);
  }
}
