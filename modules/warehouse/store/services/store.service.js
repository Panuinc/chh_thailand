import { StoreRepository } from "../repositories/store.repository";

export class StoreService {
  static getAllPaginated(skip, take) {
    return StoreRepository.getAll(skip, take);
  }

  static countAll() {
    return StoreRepository.countAll();
  }

  static getById(storeId) {
    return StoreRepository.findById(storeId);
  }

  static getByName(storeName) {
    return StoreRepository.findByName(storeName);
  }

  static create(data) {
    return StoreRepository.create(data);
  }

  static update(storeId, data) {
    return StoreRepository.update(storeId, data);
  }
}
