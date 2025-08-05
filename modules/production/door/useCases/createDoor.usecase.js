import { doorPostSchema } from "../schemas/door.schema";
import { DoorService } from "../services/door.service";
import { DoorValidator } from "../validators/door.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateDoorUseCase(data) {
  const nestedFields = [
    "grooveLines",
    "hinges",
    "locks",
    "louvers",
    "glassPanels",
    "skeleton",
    "peepHole",
  ];

  for (const key of nestedFields) {
    if (typeof data[key] === "string") {
      try {
        data[key] = JSON.parse(data[key]);
      } catch {
        data[key] = undefined;
      }
    }
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
  const duplicate = await DoorValidator.isDuplicateDoorProjectName(
    normalizedName
  );
  if (duplicate) {
    throw {
      status: 409,
      message: `Door '${normalizedName}' already exists`,
    };
  }

  return DoorService.create({
    ...parsed.data,
    doorProjectName: normalizedName,
    doorCreateAt: getLocalNow(),
    grooveLines: {
      create:
        parsed.data.grooveLines?.map((GrooveLines) => ({
          ...GrooveLines,
        })) ?? [],
    },
    hinges: {
      create:
        parsed.data.hinges?.map((Hinges) => ({
          ...Hinges,
        })) ?? [],
    },
    locks: {
      create:
        parsed.data.locks?.map((Locks) => ({
          ...Locks,
        })) ?? [],
    },
    louvers: {
      create:
        parsed.data.louvers?.map((Louvers) => ({
          ...Louvers,
        })) ?? [],
    },
    glassPanels: {
      create:
        parsed.data.glassPanels?.map((GlassPanels) => ({
          ...GlassPanels,
        })) ?? [],
    },
    peepHole: parsed.data.peepHole
      ? {
          create: {
            ...parsed.data.peepHole,
          },
        }
      : undefined,
    skeleton: parsed.data.skeleton
      ? {
          create: {
            doorSkeletonMaterialType:
              parsed.data.skeleton.doorSkeletonMaterialType,
            doorSkeletonRails: parsed.data.skeleton.doorSkeletonRails,
            doorSkeletonStiles: parsed.data.skeleton.doorSkeletonStiles,
            rails: {
              create:
                parsed.data.skeleton.rails?.map((Rails) => ({
                  ...Rails,
                })) ?? [],
            },
            stiles: {
              create:
                parsed.data.skeleton.stiles?.map((Stiles) => ({
                  ...Stiles,
                })) ?? [],
            },
            lockSet: parsed.data.skeleton.lockSet
              ? {
                  create: {
                    ...parsed.data.skeleton.lockSet,
                  },
                }
              : undefined,
          },
        }
      : undefined,
  });
}
