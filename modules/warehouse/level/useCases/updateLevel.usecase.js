import { levelPutSchema } from "../schemas/level.schema";
import { LevelService } from "../services/level.service";
import { LevelValidator } from "../validators/level.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateLevelUseCase(data) {
  const parsed = levelPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await LevelService.getById(parsed.data.levelId);
  if (!existing) {
    throw { status: 404, message: "Level not found" };
  }

  const normalizedName = parsed.data.levelName.trim().toLowerCase();

  const duplicate = await LevelValidator.isDuplicateLevelNameExceptSelf(
    normalizedName,
    parsed.data.levelStoreId,
    parsed.data.levelZoneId,
    parsed.data.levelAisleId,
    parsed.data.levelRackId,
    parsed.data.levelId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Level '${normalizedName}' already exists in this store-zone-aisle-rack`,
    };
  }

  return LevelService.update(parsed.data.levelId, {
    ...parsed.data,
    levelName: normalizedName,
    levelUpdateAt: getLocalNow(),
  });
}
