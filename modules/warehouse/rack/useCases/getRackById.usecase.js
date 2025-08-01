import { RackService } from "../services/rack.service";

export async function GetRackByIdUseCase(rackId) {
  const id = parseInt(rackId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid rack ID" };

  const rack = await RackService.getById(id);
  if (!rack) throw { status: 404, message: "Rack not found" };
  
  return rack;
}
