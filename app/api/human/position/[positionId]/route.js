import { getPositionById, updatePosition } from "@/modules/human/position/controllers/position.controller";

export async function GET(request, context) {
  const { positionId } = await context.params;
  return getPositionById(request, positionId);
}

export async function PUT(request, context) {
  const { positionId } = await context.params;
  return updatePosition(request, positionId);
}

export const dynamic = "force-dynamic";
