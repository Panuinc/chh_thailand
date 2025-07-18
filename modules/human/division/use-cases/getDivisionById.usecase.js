import { DivisionService } from "../services/division.service";

export async function GetDivisionByIdUseCase(divisionId) {
  const id = parseInt(divisionId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid division ID" };

  const division = await DivisionService.getById(id);
  if (!division) throw { status: 404, message: "Division not found" };
  
  return division;
}
