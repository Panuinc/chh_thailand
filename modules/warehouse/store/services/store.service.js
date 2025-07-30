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

  static createNested(data) {
    return StoreRepository.createNested(data);
  }

  static update(storeId, data) {
    return StoreRepository.update(storeId, data);
  }

  static replaceNested(storeId, data) {
    return StoreRepository.replaceNested(storeId, data);
  }
}
