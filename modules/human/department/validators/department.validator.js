import { DepartmentRepository } from "../repositories/department.repository";

export const DepartmentValidator = {
  async isDuplicateDepartmentName(name) {
    const department = await DepartmentRepository.findByName(name);
    return !!department;
  },
};
