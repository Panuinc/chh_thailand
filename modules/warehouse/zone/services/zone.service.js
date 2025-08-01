import { ZoneRepository } from "../repositories/zone.repository";

export class ZoneService {
  static getAllPaginated(skip, take) {
    return ZoneRepository.getAll(skip, take);
  }

  static countAll() {
    return ZoneRepository.countAll();
  }

  static getById(zoneId) {
    return ZoneRepository.findById(zoneId);
  }

  static getByName(zoneName) {
    return ZoneRepository.findByName(zoneName);
  }

  static create(data) {
    return ZoneRepository.create(data);
  }

  static update(zoneId, data) {
    return ZoneRepository.update(zoneId, data);
  }
}
