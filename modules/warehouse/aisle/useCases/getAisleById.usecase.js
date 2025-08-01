import { AisleService } from "../services/aisle.service";

export async function GetAisleByIdUseCase(aisleId) {
  const id = parseInt(aisleId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid aisle ID" };

  const aisle = await AisleService.getById(id);
  if (!aisle) throw { status: 404, message: "Aisle not found" };
  
  return aisle;
}
