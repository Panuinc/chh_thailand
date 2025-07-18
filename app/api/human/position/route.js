import {
  getAllPosition,
  createPosition,
} from "@/modules/human/position/controllers/position.controller";

export async function GET(request) {
  return getAllPosition(request);
}

export async function POST(request) {
  return createPosition(request);
}

export const dynamic = "force-dynamic";
