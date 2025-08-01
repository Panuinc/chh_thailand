import { ZoneService } from "../services/zone.service";

export async function GetZoneByIdUseCase(zoneId) {
  const id = parseInt(zoneId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid zone ID" };

  const zone = await ZoneService.getById(id);
  if (!zone) throw { status: 404, message: "Zone not found" };
  
  return zone;
}
