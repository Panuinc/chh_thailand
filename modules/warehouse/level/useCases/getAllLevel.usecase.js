import { LevelService } from "../services/level.service";

export async function GetAllLevelUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const levels = await LevelService.getAllPaginated(skip, limit);
  const total = await LevelService.countAll();

  return { levels, total };
}
