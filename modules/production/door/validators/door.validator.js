import { DoorRepository } from "../repositories/door.repository";

export const DoorValidator = {
  async isDuplicatedoorProjectName(name) {
    const door = await DoorRepository.findByName(name);
    return !!door;
  },
};
