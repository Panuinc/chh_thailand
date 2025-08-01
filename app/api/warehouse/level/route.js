import {
  getAllLevel,
  createLevel,
} from "@/modules/warehouse/level/controllers/level.controller";

export async function GET(request) {
  return getAllLevel(request);
}

export async function POST(request) {
  return createLevel(request);
}

export const dynamic = "force-dynamic";
