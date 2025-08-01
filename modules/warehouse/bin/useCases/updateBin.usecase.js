import { binPutSchema } from "../schemas/bin.schema";
import { BinService } from "../services/bin.service";
import { BinValidator } from "../validators/bin.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateBinUseCase(data) {
  const parsed = binPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await BinService.getById(parsed.data.binId);
  if (!existing) {
    throw { status: 404, message: "Bin not found" };
  }

  const normalizedName = parsed.data.binName.trim().toLowerCase();

  const duplicate = await BinValidator.isDuplicateBinNameExceptSelf(
    normalizedName,
    parsed.data.binStoreId,
    parsed.data.binZoneId,
    parsed.data.binAisleId,
    parsed.data.binRackId,
    parsed.data.binLevelId,
    parsed.data.binId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Bin '${normalizedName}' already exists in this store-zone-aisle-rack-level`,
    };
  }

  return BinService.update(parsed.data.binId, {
    ...parsed.data,
    binName: normalizedName,
    binUpdateAt: getLocalNow(),
  });
}
