import { divisionPutSchema } from "../schemas/division.schema";
import { DivisionService } from "../services/division.service";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateDivisionUseCase(data) {
  const parsed = divisionPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await DivisionService.getById(parsed.data.divisionId);
  if (!existing) {
    throw { status: 404, message: "Division not found" };
  }

  return DivisionService.update(parsed.data.divisionId, {
    ...parsed.data,
    divisionName: parsed.data.divisionName.trim().toLowerCase(),
    divisionUpdateAt: getLocalNow(),
  });
}
