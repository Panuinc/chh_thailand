import { getStoreById, updateStore } from "@/modules/warehouse/store/controllers/store.controller";

export async function GET(request, context) {
  const { storeId } = await context.params;
  return getStoreById(request, storeId);
}

export async function PUT(request, context) {
  const { storeId } = await context.params;
  return updateStore(request, storeId);
}

export const dynamic = "force-dynamic";
