import { DepartmentService } from "../services/department.service";

export async function GetAllDepartmentUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const departments = await DepartmentService.getAllPaginated(skip, limit);
  const total = await DepartmentService.countAll();

  return { departments, total };
}
