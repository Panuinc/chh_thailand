import { DepartmentRepository } from "../repositories/department.repository";

export const DepartmentValidator = {
  async isDuplicateDepartmentName(name, divisionId) {
    const department = await DepartmentRepository.findByName(name, divisionId);
    return !!department;
  },
};
