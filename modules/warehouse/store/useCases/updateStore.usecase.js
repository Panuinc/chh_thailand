import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateStoreUseCase(data) {
  const parsed = storePutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await StoreService.getById(parsed.data.storeId);
  if (!existing) {
    throw { status: 404, message: "Store not found" };
  }

  const normalizedCode = parsed.data.storeCode.trim().toLowerCase();
  const duplicateCode = await StoreValidator.isDuplicateStoreCodeExceptSelf(
    normalizedCode,
    parsed.data.storeId
  );
  if (duplicateCode) {
    throw {
      status: 409,
      message: `Store code '${normalizedCode}' already exists`,
    };
  }

  return StoreService.update(parsed.data.storeId, {
    ...parsed.data,
    storeCode: normalizedCode,
    storeName: parsed.data.storeName.trim().toLowerCase(),
    storeUpdateAt: getLocalNow(),
  });
}
