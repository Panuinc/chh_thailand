import { PositionRepository } from "../repositories/position.repository";

export const PositionValidator = {
  async isDuplicatePositionName(name, divisionId, departmentId) {
    const position = await PositionRepository.findByName(name, divisionId, departmentId);
    return !!position;
  },
};
