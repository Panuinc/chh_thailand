import { departmentPutSchema } from "../schemas/department.schema";
import { DepartmentService } from "../services/department.service";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateDepartmentUseCase(data) {
  const parsed = departmentPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await DepartmentService.getById(parsed.data.departmentId);
  if (!existing) {
    throw { status: 404, message: "Department not found" };
  }

  return DepartmentService.update(parsed.data.departmentId, {
    ...parsed.data,
    departmentName: parsed.data.departmentName.trim().toLowerCase(),
    departmentUpdateAt: getLocalNow(),
  });
}
