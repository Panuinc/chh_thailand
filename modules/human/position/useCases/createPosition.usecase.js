import { positionPostSchema } from "../schemas/position.schema";
import { PositionService } from "../services/position.service";
import { PositionValidator } from "../validators/position.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreatePositionUseCase(data) {
  const parsed = positionPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.positionName.trim().toLowerCase();
  const duplicate = await PositionValidator.isDuplicatePositionName(
  normalizedName,
  parsed.data.positionDivisionId,
  parsed.data.positionDepartmentId
);

  if (duplicate) {
    throw {
      status: 409,
      message: `Position '${normalizedName}' already exists`,
    };
  }

  return PositionService.create({
    ...parsed.data,
    positionName: normalizedName,
    positionCreateAt: getLocalNow(),
  });
}
