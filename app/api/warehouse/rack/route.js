import {
  getAllRack,
  createRack,
} from "@/modules/warehouse/rack/controllers/rack.controller";

export async function GET(request) {
  return getAllRack(request);
}

export async function POST(request) {
  return createRack(request);
}

export const dynamic = "force-dynamic";
