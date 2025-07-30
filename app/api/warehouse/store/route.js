import {
  getAllStore,
  createStore,
} from "@/modules/warehouse/store/controllers/store.controller";

export async function GET(request) {
  return getAllStore(request);
}

export async function POST(request) {
  return createStore(request);
}

export const dynamic = "force-dynamic";
