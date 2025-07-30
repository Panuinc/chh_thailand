import { partnerPutSchema } from "../schemas/partner.schema";
import { PartnerService } from "../services/partner.service";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdatePartnerUseCase(data) {
  const parsed = partnerPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await PartnerService.getById(parsed.data.partnerId);
  if (!existing) {
    throw { status: 404, message: "Partner not found" };
  }

  return PartnerService.update(parsed.data.partnerId, {
    ...parsed.data,
    partnerName: parsed.data.partnerName.trim().toLowerCase(),
    partnerUpdateAt: getLocalNow(),
  });
}
