import { DoorService } from "../services/door.service";

export async function GetDoorByIdUseCase(doorId) {
  const id = parseInt(doorId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid door ID" };

  const door = await DoorService.getById(id);
  if (!door) throw { status: 404, message: "Door not found" };

  return door;
}
