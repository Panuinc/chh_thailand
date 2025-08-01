import { getZoneById, updateZone } from "@/modules/warehouse/zone/controllers/zone.controller";

export async function GET(request, context) {
  const { zoneId } = await context.params;
  return getZoneById(request, zoneId);
}

export async function PUT(request, context) {
  const { zoneId } = await context.params;
  return updateZone(request, zoneId);
}

export const dynamic = "force-dynamic";
