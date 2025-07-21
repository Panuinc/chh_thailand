import { UserRepository } from "../repositories/user.repository";

export class UserService {
  static getAllPaginated(skip, take) {
    return UserRepository.getAll(skip, take);
  }

  static countAll() {
    return UserRepository.countAll();
  }

  static getById(userId) {
    return UserRepository.findById(userId);
  }

  static create(data) {
    return UserRepository.create(data);
  }

  static update(userId, data) {
    return UserRepository.update(userId, data);
  }

  static createAuth(data) {
    return UserRepository.createAuth(data);
  }

  static createJob(data) {
    return UserRepository.createJob(data);
  }

  static updateJob(userId, data) {
    return UserRepository.updateJob(userId, data);
  }
}
