import { getBinById, updateBin } from "@/modules/warehouse/bin/controllers/bin.controller";

export async function GET(request, context) {
  const { binId } = await context.params;
  return getBinById(request, binId);
}

export async function PUT(request, context) {
  const { binId } = await context.params;
  return updateBin(request, binId);
}

export const dynamic = "force-dynamic";
