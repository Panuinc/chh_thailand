import { binPostSchema } from "../schemas/bin.schema";
import { BinService } from "../services/bin.service";
import { BinValidator } from "../validators/bin.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateBinUseCase(data) {
  const parsed = binPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.binName.trim().toLowerCase();

  const duplicate = await BinValidator.isDuplicateBinName(
    normalizedName,
    parsed.data.binStoreId,
    parsed.data.binZoneId,
    parsed.data.binAisleId,
    parsed.data.binRackId,
    parsed.data.binLevelId
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Bin '${normalizedName}' already exists in this store-zone-aisle-rack-level`,
    };
  }

  return BinService.create({
    ...parsed.data,
    binName: normalizedName,
    binCreateAt: getLocalNow(),
  });
}
