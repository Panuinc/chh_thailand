import { doorPostSchema } from "../schemas/door.schema";
import { DoorService } from "../services/door.service";
import { DoorValidator } from "../validators/door.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateDoorUseCase(data) {
  try {
    data.grooveLines = typeof data.grooveLines === "string" ? JSON.parse(data.grooveLines) : data.grooveLines;
  } catch {
    data.grooveLines = [];
  }

  try {
    data.hinges = typeof data.hinges === "string" ? JSON.parse(data.hinges) : data.hinges;
  } catch {
    data.hinges = [];
  }

  try {
    data.locks = typeof data.locks === "string" ? JSON.parse(data.locks) : data.locks;
  } catch {
    data.locks = [];
  }

  try {
    data.peepHole = typeof data.peepHole === "string" ? JSON.parse(data.peepHole) : data.peepHole;
  } catch {
    data.peepHole = undefined;
  }

  try {
    data.louvers = typeof data.louvers === "string" ? JSON.parse(data.louvers) : data.louvers;
  } catch {
    data.louvers = [];
  }

  try {
    data.glassPanels = typeof data.glassPanels === "string" ? JSON.parse(data.glassPanels) : data.glassPanels;
  } catch {
    data.glassPanels = [];
  }

  try {
    data.skeleton = typeof data.skeleton === "string" ? JSON.parse(data.skeleton) : data.skeleton;
    if (data.skeleton) {
      data.skeleton.rails = typeof data.skeleton.rails === "string" ? JSON.parse(data.skeleton.rails) : data.skeleton.rails;
      data.skeleton.stiles = typeof data.skeleton.stiles === "string" ? JSON.parse(data.skeleton.stiles) : data.skeleton.stiles;
      data.skeleton.lockSet = typeof data.skeleton.lockSet === "string" ? JSON.parse(data.skeleton.lockSet) : data.skeleton.lockSet;
    }
  } catch {
    data.skeleton = undefined;
  }

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
    throw {
      status: 409,
      message: `Door '${normalizedName}' already exists`,
    };
  }

  return DoorService.create({
    doorProjectCode: parsed.data.doorProjectCode.trim(),
    doorCode: parsed.data.doorCode.trim(),
    doorRevisionNumber: parsed.data.doorRevisionNumber,
    doorProjectName: normalizedName,
    doorCustomerId: parsed.data.doorCustomerId,
    doorUserSaleId: parsed.data.doorUserSaleId,
    doorDimensionsWidth: parsed.data.doorDimensionsWidth,
    doorDimensionsHeight: parsed.data.doorDimensionsHeight,
    doorDimensionsThickness: parsed.data.doorDimensionsThickness,
    doorType: parsed.data.doorType,
    doorSurfaceMaterial: parsed.data.doorSurfaceMaterial,
    doorSurfaceThickness: parsed.data.doorSurfaceThickness,
    doorCoreMaterial: parsed.data.doorCoreMaterial,
    doorSurfaceTypeTop: parsed.data.doorSurfaceTypeTop,
    doorSurfaceTypeTopCode: parsed.data.doorSurfaceTypeTopCode.trim(),
    doorSurfaceTypeTopThickness: parsed.data.doorSurfaceTypeTopThickness?.trim() ?? null,
    doorSurfaceTypeTopDescription: parsed.data.doorSurfaceTypeTopDescription?.trim() ?? null,
    doorSurfaceTypeBottom: parsed.data.doorSurfaceTypeBottom,
    doorSurfaceTypeBottomCode: parsed.data.doorSurfaceTypeBottomCode.trim(),
    doorSurfaceTypeBottomThickness: parsed.data.doorSurfaceTypeBottomThickness?.trim() ?? null,
    doorSurfaceTypeBottomDescription: parsed.data.doorSurfaceTypeBottomDescription?.trim() ?? null,
    doorCreateBy: parsed.data.doorCreateBy,
    doorCreateAt: getLocalNow(),

    grooveLines: parsed.data.grooveLines ?? [],
    hinges: parsed.data.hinges ?? [],
    locks: parsed.data.locks ?? [],
    peepHole: parsed.data.peepHole ?? undefined,
    louvers: parsed.data.louvers ?? [],
    glassPanels: parsed.data.glassPanels ?? [],
    skeleton: parsed.data.skeleton ?? undefined,
  });
}
