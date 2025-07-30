import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
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

  return StoreService.update(parsed.data.storeId, {
    ...parsed.data,
    storeName: parsed.data.storeName.trim().toLowerCase(),
    storeUpdateAt: getLocalNow(),
  });
}
