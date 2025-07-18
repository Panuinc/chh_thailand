import { departmentPostSchema } from "../schemas/department.schema";
import { DepartmentService } from "../services/department.service";
import { DepartmentValidator } from "../validators/department.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateDepartmentUseCase(data) {
  const parsed = departmentPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.departmentName.trim().toLowerCase();
  const duplicate = await DepartmentValidator.isDuplicateDepartmentName(
    normalizedName,
    parsed.data.departmentDivisionId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Department '${normalizedName}' already exists`,
    };
  }

  return DepartmentService.create({
    ...parsed.data,
    departmentName: normalizedName,
    departmentCreateAt: getLocalNow(),
  });
}
