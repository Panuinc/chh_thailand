import { RackService } from "../services/rack.service";

export async function GetAllRackUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const racks = await RackService.getAllPaginated(skip, limit);
  const total = await RackService.countAll();

  return { racks, total };
}
