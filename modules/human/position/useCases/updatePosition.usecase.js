import { positionPutSchema } from "../schemas/position.schema";
import { PositionService } from "../services/position.service";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdatePositionUseCase(data) {
  const parsed = positionPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await PositionService.getById(parsed.data.positionId);
  if (!existing) {
    throw { status: 404, message: "Position not found" };
  }

  return PositionService.update(parsed.data.positionId, {
    ...parsed.data,
    positionName: parsed.data.positionName.trim().toLowerCase(),
    positionUpdateAt: getLocalNow(),
  });
}
