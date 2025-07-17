import { RoleRepository } from "../repositories/role.repository";

export class RoleService {
  static getAllPaginated(skip, take) {
    return RoleRepository.getAll(skip, take);
  }

  static countAll() {
    return RoleRepository.countAll();
  }

  static getById(roleId) {
    return RoleRepository.findById(roleId);
  }

  static getByName(roleName) {
    return RoleRepository.findByName(roleName);
  }

  static create(data) {
    return RoleRepository.create(data);
  }

  static update(roleId, data) {
    return RoleRepository.update(roleId, data);
  }
}
