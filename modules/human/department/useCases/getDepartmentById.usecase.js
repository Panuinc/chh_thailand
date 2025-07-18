import { DepartmentService } from "../services/department.service";

export async function GetDepartmentByIdUseCase(departmentId) {
  const id = parseInt(departmentId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid department ID" };

  const department = await DepartmentService.getById(id);
  if (!department) throw { status: 404, message: "Department not found" };
  
  return department;
}
