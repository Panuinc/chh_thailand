import { StoreService } from "../services/store.service";

export async function GetStoreByIdUseCase(storeId) {
  const id = parseInt(storeId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid store ID" };

  const store = await StoreService.getById(id);
  if (!store) throw { status: 404, message: "Store not found" };

  return store;
}
