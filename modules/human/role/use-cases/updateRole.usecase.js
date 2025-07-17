import { rolePutSchema } from "../schemas/role.schema";
import { RoleService } from "../services/role.service";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateRoleUseCase(data) {
  const parsed = rolePutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await RoleService.getById(parsed.data.roleId);
  if (!existing) {
    throw { status: 404, message: "Role not found" };
  }

  return RoleService.update(parsed.data.roleId, {
    ...parsed.data,
    roleName: parsed.data.roleName.trim().toLowerCase(),
    roleUpdateAt: getLocalNow(),
  });
}
