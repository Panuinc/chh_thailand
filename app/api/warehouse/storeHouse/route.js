import {
  getAllStoreHouse,
  createStoreHouse,
} from "@/modules/warehouse/storeHouse/controllers/storeHouse.controller";

export async function GET(request) {
  return getAllStoreHouse(request);
}

export async function POST(request) {
  return createStoreHouse(request);
}

export const dynamic = "force-dynamic";
