import { divisionPostSchema } from "../schemas/division.schema";
import { DivisionService } from "../services/division.service";
import { DivisionValidator } from "../validators/division.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateDivisionUseCase(data) {
  const parsed = divisionPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.divisionName.trim().toLowerCase();
  const duplicate = await DivisionValidator.isDuplicateDivisionName(normalizedName);
  if (duplicate) {
    throw { status: 409, message: `Division '${normalizedName}' already exists` };
  }

  return DivisionService.create({
    ...parsed.data,
    divisionName: normalizedName,
    divisionCreateAt: getLocalNow(),
  });
}
