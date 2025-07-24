import { CustomerRepository } from "../repositories/customer.repository";

export class CustomerService {
  static getAllPaginated(skip, take) {
    return CustomerRepository.getAll(skip, take);
  }

  static countAll() {
    return CustomerRepository.countAll();
  }

  static getById(customerId) {
    return CustomerRepository.findById(customerId);
  }

  static getByName(customerName) {
    return CustomerRepository.findByName(customerName);
  }

  static create(data) {
    return CustomerRepository.create(data);
  }

  static update(customerId, data) {
    return CustomerRepository.update(customerId, data);
  }
}
