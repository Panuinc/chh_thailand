import {
  getStoreHouseById,
  updateStoreHouse,
} from "@/modules/warehouse/storeHouse/controllers/storeHouse.controller";

export async function GET(request, context) {
  const { storeHouseId } = await context.params;
  return getStoreHouseById(request, storeHouseId);
}

export async function PUT(request, context) {
  const { storeHouseId } = await context.params;
  return updateStoreHouse(request, storeHouseId);
}

export const dynamic = "force-dynamic";
