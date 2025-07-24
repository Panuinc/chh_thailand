import {
  getAllDoor,
  createDoor,
} from "@/modules/production/door/controllers/door.controller";

export async function GET(request) {
  return getAllDoor(request);
}

export async function POST(request) {
  return createDoor(request);
}

export const dynamic = "force-dynamic";
