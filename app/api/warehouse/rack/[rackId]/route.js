import { getRackById, updateRack } from "@/modules/warehouse/rack/controllers/rack.controller";

export async function GET(request, context) {
  const { rackId } = await context.params;
  return getRackById(request, rackId);
}

export async function PUT(request, context) {
  const { rackId } = await context.params;
  return updateRack(request, rackId);
}

export const dynamic = "force-dynamic";
