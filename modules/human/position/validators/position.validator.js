import { PositionRepository } from "../repositories/position.repository";

export const PositionValidator = {
  async isDuplicatePositionName(name, divisionId) {
    const position = await PositionRepository.findByName(name, divisionId);
    return !!position;
  },
};
