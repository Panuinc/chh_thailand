import { doorPutSchema } from "../schemas/door.schema";
import { DoorService } from "../services/door.service";
import { getLocalNow } from "@/lib/getLocalNow";

export async function UpdateDoorUseCase(data) {
  const parsed = doorPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await DoorService.getById(parsed.data.doorId);
  if (!existing) {
    throw { status: 404, message: "Door not found" };
  }

  return DoorService.update(parsed.data.doorId, {
    ...parsed.data,
    doorName: parsed.data.doorName.trim().toLowerCase(),
    doorUpdateAt: getLocalNow(),
  });
}
