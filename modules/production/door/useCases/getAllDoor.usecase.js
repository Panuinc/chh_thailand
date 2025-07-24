import { DoorService } from "../services/door.service";

export async function GetAllDoorUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const doors = await DoorService.getAllPaginated(skip, limit);
  const total = await DoorService.countAll();

  return { doors, total };
}
