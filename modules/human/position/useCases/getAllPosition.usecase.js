import { PositionService } from "../services/position.service";

export async function GetAllPositionUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const positions = await PositionService.getAllPaginated(skip, limit);
  const total = await PositionService.countAll();

  return { positions, total };
}
