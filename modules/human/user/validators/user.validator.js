import { UserRepository } from "../repositories/user.repository";

export const UserValidator = {
  async isDuplicateUserEmail(email) {
    const user = await UserRepository.findByEmail(email);
    return !!user;
  },
};
