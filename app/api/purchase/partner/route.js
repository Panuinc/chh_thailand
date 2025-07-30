import {
  getAllPartner,
  createPartner,
} from "@/modules/purchase/partner/controllers/partner.controller";

export async function GET(request) {
  return getAllPartner(request);
}

export async function POST(request) {
  return createPartner(request);
}

export const dynamic = "force-dynamic";
