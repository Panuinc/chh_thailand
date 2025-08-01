import { zonePostSchema } from "../schemas/zone.schema";
import { ZoneService } from "../services/zone.service";
import { ZoneValidator } from "../validators/zone.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateZoneUseCase(data) {
  const parsed = zonePostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.zoneName.trim().toLowerCase();
  const duplicate = await ZoneValidator.isDuplicateZoneName(
    normalizedName,
    parsed.data.zoneStoreId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Zone '${normalizedName}' already exists in this store`,
    };
  }

  return ZoneService.create({
    ...parsed.data,
    zoneName: normalizedName,
    zoneCreateAt: getLocalNow(),
  });
}
