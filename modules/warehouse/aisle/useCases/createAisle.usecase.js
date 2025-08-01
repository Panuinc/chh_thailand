import { aislePostSchema } from "../schemas/aisle.schema";
import { AisleService } from "../services/aisle.service";
import { AisleValidator } from "../validators/aisle.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateAisleUseCase(data) {
  const parsed = aislePostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.aisleName.trim().toLowerCase();
  const duplicate = await AisleValidator.isDuplicateAisleName(
    normalizedName,
    parsed.data.aisleStoreId,
    parsed.data.aisleZoneId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Aisle '${normalizedName}' already exists in this store-zone`,
    };
  }

  return AisleService.create({
    ...parsed.data,
    aisleName: normalizedName,
    aisleCreateAt: getLocalNow(),
  });
}
