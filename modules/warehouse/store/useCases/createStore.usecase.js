import { storePostSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateStoreUseCase(data) {
  const parsed = storePostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.storeName.trim().toLowerCase();
  const duplicateCode = await StoreValidator.isDuplicateStoreCode(
    parsed.data.storeCode
  );
  if (duplicateCode) {
    throw {
      status: 409,
      message: `Store code '${parsed.data.storeCode}' already exists`,
    };
  }

  return StoreService.create({
    ...parsed.data,
    storeName: normalizedName,
    storeCreateAt: getLocalNow(),
  });
}
