import { getLevelById, updateLevel } from "@/modules/warehouse/level/controllers/level.controller";

export async function GET(request, context) {
  const { levelId } = await context.params;
  return getLevelById(request, levelId);
}

export async function PUT(request, context) {
  const { levelId } = await context.params;
  return updateLevel(request, levelId);
}

export const dynamic = "force-dynamic";
