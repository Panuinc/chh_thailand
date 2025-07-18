import { DivisionService } from "../services/division.service";

export async function GetAllDivisionUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const divisions = await DivisionService.getAllPaginated(skip, limit);
  const total = await DivisionService.countAll();

  return { divisions, total };
}
