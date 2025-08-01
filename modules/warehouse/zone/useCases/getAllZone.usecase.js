import { ZoneService } from "../services/zone.service";

export async function GetAllZoneUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const zones = await ZoneService.getAllPaginated(skip, limit);
  const total = await ZoneService.countAll();

  return { zones, total };
}
