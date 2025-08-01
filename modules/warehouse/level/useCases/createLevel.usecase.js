import { levelPostSchema } from "../schemas/level.schema";
import { LevelService } from "../services/level.service";
import { LevelValidator } from "../validators/level.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateLevelUseCase(data) {
  const parsed = levelPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.levelName.trim().toLowerCase();

  const duplicate = await LevelValidator.isDuplicateLevelName(
    normalizedName,
    parsed.data.levelStoreId,
    parsed.data.levelZoneId,
    parsed.data.levelAisleId,
    parsed.data.levelRackId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Level '${normalizedName}' already exists in this store-zone-aisle-rack`,
    };
  }

  return LevelService.create({
    ...parsed.data,
    levelName: normalizedName,
    levelCreateAt: getLocalNow(),
  });
}
