import { StoreService } from "../services/store.service";

export async function GetAllStoreUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const stores = await StoreService.getAllPaginated(skip, limit);
  const total = await StoreService.countAll();

  return { stores, total };
}
