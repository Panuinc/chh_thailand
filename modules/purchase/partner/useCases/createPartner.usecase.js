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

  const normalizedName = parsed.data.partnerName.trim().toLowerCase();
  const duplicate = await PartnerValidator.isDuplicatePartnerName(normalizedName);
  if (duplicate) {
    throw { status: 409, message: `Partner '${normalizedName}' already exists` };
  }

  return PartnerService.create({
    ...parsed.data,
    partnerName: normalizedName,
    partnerCreateAt: getLocalNow(),
  });
}
