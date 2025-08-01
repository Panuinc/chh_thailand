import { LevelService } from "../services/level.service";

export async function GetLevelByIdUseCase(levelId) {
  const id = parseInt(levelId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid level ID" };

  const level = await LevelService.getById(id);
  if (!level) throw { status: 404, message: "Level not found" };
  
  return level;
}
