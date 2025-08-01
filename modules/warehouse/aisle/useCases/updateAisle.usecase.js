import { aislePutSchema } from "../schemas/aisle.schema";
import { AisleService } from "../services/aisle.service";
import { AisleValidator } from "../validators/aisle.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateAisleUseCase(data) {
  const parsed = aislePutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await AisleService.getById(parsed.data.aisleId);
  if (!existing) {
    throw { status: 404, message: "Aisle not found" };
  }

  const normalizedName = parsed.data.aisleName.trim().toLowerCase();
  const duplicate = await AisleValidator.isDuplicateAisleNameExceptSelf(
    normalizedName,
    parsed.data.aisleStoreId,
    parsed.data.aisleId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Aisle '${normalizedName}' already exists in this store`,
    };
  }

  return AisleService.update(parsed.data.aisleId, {
    ...parsed.data,
    aisleName: normalizedName,
    aisleUpdateAt: getLocalNow(),
  });
}
