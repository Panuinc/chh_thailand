import { getPartnerById, updatePartner } from "@/modules/purchase/partner/controllers/partner.controller";

export async function GET(request, context) {
  const { partnerId } = await context.params;
  return getPartnerById(request, partnerId);
}

export async function PUT(request, context) {
  const { partnerId } = await context.params;
  return updatePartner(request, partnerId);
}

export const dynamic = "force-dynamic";
