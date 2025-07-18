import { DepartmentRepository } from "../repositories/department.repository";

export class DepartmentService {
  static getAllPaginated(skip, take) {
    return DepartmentRepository.getAll(skip, take);
  }

  static countAll() {
    return DepartmentRepository.countAll();
  }

  static getById(departmentId) {
    return DepartmentRepository.findById(departmentId);
  }

  static getByName(departmentName) {
    return DepartmentRepository.findByName(departmentName);
  }

  static create(data) {
    return DepartmentRepository.create(data);
  }

  static update(departmentId, data) {
    return DepartmentRepository.update(departmentId, data);
  }
}
