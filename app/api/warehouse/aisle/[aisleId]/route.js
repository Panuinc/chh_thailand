import { getAisleById, updateAisle } from "@/modules/warehouse/aisle/controllers/aisle.controller";

export async function GET(request, context) {
  const { zoneId } = await context.params;
  return getAisleById(request, zoneId);
}

export async function PUT(request, context) {
  const { zoneId } = await context.params;
  return updateAisle(request, zoneId);
}

export const dynamic = "force-dynamic";
