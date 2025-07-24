import { DoorRepository } from "../repositories/door.repository";

export const DoorValidator = {
  async isDuplicateDoorName(name) {
    const door = await DoorRepository.findByName(name);
    return !!door;
  },
};
