import { getAisleById, updateAisle } from "@/modules/warehouse/aisle/controllers/aisle.controller";

export async function GET(request, context) {
  const { aisleId } = await context.params;
  return getAisleById(request, aisleId);
}

export async function PUT(request, context) {
  const { aisleId } = await context.params;
  return updateAisle(request, aisleId);
}

export const dynamic = "force-dynamic";
