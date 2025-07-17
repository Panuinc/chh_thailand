import { rolePostSchema } from "../schemas/role.schema";
import { RoleService } from "../services/role.service";
import { RoleValidator } from "../validators/role.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateRoleUseCase(data) {
  const parsed = rolePostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.roleName.trim().toLowerCase();
  const duplicate = await RoleValidator.isDuplicateRoleName(normalizedName);
  if (duplicate) {
    throw { status: 409, message: `Role '${normalizedName}' already exists` };
  }

  return RoleService.create({
    ...parsed.data,
    roleName: normalizedName,
    roleCreateAt: getLocalNow(),
  });
}
