import { partnerPostSchema } from "../schemas/partner.schema";
import { PartnerService } from "../services/partner.service";
import { PartnerValidator } from "../validators/partner.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreatePartnerUseCase(data) {
  const parsed = partnerPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const { partnerName, partnerTaxId } = parsed.data;
  const normalizedName = partnerName.trim().toLowerCase();
  const normalizedTax = partnerTaxId.trim();

  const duplicate = await PartnerValidator.isDuplicatePartnerNameAndTax(
    normalizedName,
    normalizedTax
  );
  if (duplicate) {
    throw {
      status: 409,
      message: `Partner '${partnerName}' with Tax ID '${partnerTaxId}' already exists`,
    };
  }

  return PartnerService.create({
    ...parsed.data,
    partnerName: normalizedName,
    partnerTaxId: normalizedTax,
    partnerStatus: "Enable",
    partnerCreateAt: getLocalNow(),
  });
}
