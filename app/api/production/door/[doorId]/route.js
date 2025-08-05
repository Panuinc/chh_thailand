import { getDoorById, updateDoor } from "@/modules/production/door/controllers/door.controller";

export async function GET(request, context) {
  const { doorId } = await context.params;
  return getDoorById(request, doorId);
}

export async function PUT(request, context) {
  const { doorId } = await context.params;
  return updateDoor(request, doorId);
}

export const dynamic = "force-dynamic";
