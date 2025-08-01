import { rackPutSchema } from "../schemas/rack.schema";
import { RackService } from "../services/rack.service";
import { RackValidator } from "../validators/rack.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateRackUseCase(data) {
  const parsed = rackPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await RackService.getById(parsed.data.rackId);
  if (!existing) {
    throw { status: 404, message: "Rack not found" };
  }

  const normalizedName = parsed.data.rackName.trim().toLowerCase();
  const duplicate = await RackValidator.isDuplicateRackNameExceptSelf(
    normalizedName,
    parsed.data.rackStoreId,
    parsed.data.rackZoneId,
    parsed.data.rackAisleId,
    parsed.data.rackId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Rack '${normalizedName}' already exists in this store-zone-aisle`,
    };
  }

  return RackService.update(parsed.data.rackId, {
    ...parsed.data,
    rackName: normalizedName,
    rackUpdateAt: getLocalNow(),
  });
}
