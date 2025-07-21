import { UserRepository } from "../repositories/user.repository";

export const UserValidator = {
  async isDuplicateUserName(name) {
    const user = await UserRepository.findByName(name);
    return !!user;
  },
};
