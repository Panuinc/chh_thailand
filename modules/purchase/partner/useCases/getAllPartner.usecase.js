import { PartnerService } from "../services/partner.service";

export async function GetAllPartnerUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const partners = await PartnerService.getAllPaginated(skip, limit);
  const total = await PartnerService.countAll();

  return { partners, total };
}
