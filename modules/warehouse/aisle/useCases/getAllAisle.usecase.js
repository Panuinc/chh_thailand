import { AisleService } from "../services/aisle.service";

export async function GetAllAisleUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const aisles = await AisleService.getAllPaginated(skip, limit);
  const total = await AisleService.countAll();

  return { aisles, total };
}
