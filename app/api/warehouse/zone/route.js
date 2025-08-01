import {
  getAllZone,
  createZone,
} from "@/modules/warehouse/zone/controllers/zone.controller";

export async function GET(request) {
  return getAllZone(request);
}

export async function POST(request) {
  return createZone(request);
}

export const dynamic = "force-dynamic";
