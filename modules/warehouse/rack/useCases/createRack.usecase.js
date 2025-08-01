import { rackPostSchema } from "../schemas/rack.schema";
import { RackService } from "../services/rack.service";
import { RackValidator } from "../validators/rack.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateRackUseCase(data) {
  const parsed = rackPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.rackName.trim().toLowerCase();
  const duplicate = await RackValidator.isDuplicateRackName(
    normalizedName,
    parsed.data.rackStoreId,
    parsed.data.rackZoneId,
    parsed.data.rackAisleId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Rack '${normalizedName}' already exists in this store-zone-aisle`,
    };
  }

  return RackService.create({
    ...parsed.data,
    rackName: normalizedName,
    rackCreateAt: getLocalNow(),
  });
}
