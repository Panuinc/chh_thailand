import { DivisionRepository } from "../repositories/division.repository";

export const DivisionValidator = {
  async isDuplicateDivisionName(name) {
    const division = await DivisionRepository.findByName(name);
    return !!division;
  },
};
