import { RoleRepository } from "../repositories/role.repository";

export const RoleValidator = {
  async isDuplicateRoleName(name) {
    const role = await RoleRepository.findByName(name);
    return !!role;
  },
};
