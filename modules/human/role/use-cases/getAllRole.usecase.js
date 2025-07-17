import { RoleService } from "../services/role.service";

export async function GetAllRoleUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const roles = await RoleService.getAllPaginated(skip, limit);
  const total = await RoleService.countAll();

  return { roles, total };
}
