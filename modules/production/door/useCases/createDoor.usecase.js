import { doorPostSchema } from "../schemas/door.schema";
import { DoorService } from "../services/door.service";
import { DoorValidator } from "../validators/door.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateDoorUseCase(data) {
  const parsed = doorPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.doorProjectName.trim().toLowerCase();
  const duplicate = await DoorValidator.isDuplicateDoorProjectName(normalizedName);
  if (duplicate) {
    throw { status: 409, message: `Door '${normalizedName}' already exists` };
  }

  return DoorService.create({
    ...parsed.data,
    doorProjectName: normalizedName,
    doorCreateAt: getLocalNow(),
  });
}
