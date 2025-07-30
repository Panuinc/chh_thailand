import { PartnerService } from "../services/partner.service";

export async function GetPartnerByIdUseCase(partnerId) {
  const id = parseInt(partnerId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid partner ID" };

  const partner = await PartnerService.getById(id);
  if (!partner) throw { status: 404, message: "Partner not found" };

  return partner;
}
