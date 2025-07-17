import { RoleService } from "../services/role.service";

export async function GetRoleByIdUseCase(roleId) {
  const id = parseInt(roleId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid role ID" };

  const role = await RoleService.getById(id);
  if (!role) throw { status: 404, message: "Role not found" };

  return role;
}
