import { PositionService } from "../services/position.service";

export async function GetPositionByIdUseCase(positionId) {
  const id = parseInt(positionId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid position ID" };

  const position = await PositionService.getById(id);
  if (!position) throw { status: 404, message: "Position not found" };
  
  return position;
}
