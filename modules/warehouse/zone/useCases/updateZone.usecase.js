import { zonePutSchema } from "../schemas/zone.schema";
import { ZoneService } from "../services/zone.service";
import { ZoneValidator } from "../validators/zone.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateZoneUseCase(data) {
  const parsed = zonePutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await ZoneService.getById(parsed.data.zoneId);
  if (!existing) {
    throw { status: 404, message: "Zone not found" };
  }

  const normalizedName = parsed.data.zoneName.trim().toLowerCase();
  const duplicate = await ZoneValidator.isDuplicateZoneNameExceptSelf(
    normalizedName,
    parsed.data.zoneStoreId,
    parsed.data.zoneId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Zone '${normalizedName}' already exists in this store`,
    };
  }

  return ZoneService.update(parsed.data.zoneId, {
    ...parsed.data,
    zoneName: normalizedName,
    zoneUpdateAt: getLocalNow(),
  });
}
