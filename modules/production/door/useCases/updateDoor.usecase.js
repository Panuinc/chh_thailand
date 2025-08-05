import { doorPutSchema } from "../schemas/door.schema";
import { DoorService } from "../services/door.service";
import { getLocalNow } from "@/lib/getLocalNow";
import prisma from "@/lib/prisma";

export async function UpdateDoorUseCase(data) {
  const nestedFields = [
    "grooveLines",
    "hinges",
    "locks",
    "louvers",
    "glassPanels",
    "peepHole",
    "skeleton",
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

  const parsed = doorPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    doorId,
    grooveLines = [],
    hinges = [],
    locks = [],
    louvers = [],
    glassPanels = [],
    peepHole,
    skeleton,
    doorUpdateBy,
  } = parsed.data;

  const existing = await DoorService.getById(doorId);
  if (!existing) {
    throw { status: 404, message: "Door not found" };
  }

  const existingGrooveLines = await prisma.doorGrooveLines.findMany({
    where: { DoorGrooveLinesDoorId: doorId },
  });
  const grooveLineIds = new Set(
    grooveLines.map((x) => x.DoorGrooveLinesId).filter(Boolean)
  );
  await prisma.doorGrooveLines.deleteMany({
    where: {
      DoorGrooveLinesDoorId: doorId,
      DoorGrooveLinesId: { notIn: Array.from(grooveLineIds) },
    },
  });
  for (const g of grooveLines) {
    if (g.DoorGrooveLinesId) {
      await prisma.doorGrooveLines.update({
        where: { DoorGrooveLinesId: g.DoorGrooveLinesId },
        data: {
          DoorGrooveLinesDistanceFromTop: g.DoorGrooveLinesDistanceFromTop,
          DoorGrooveLinesDistanceFromLeft: g.DoorGrooveLinesDistanceFromLeft,
          DoorGrooveLinesWidth: g.DoorGrooveLinesWidth,
          DoorGrooveLinesLength: g.DoorGrooveLinesLength,
        },
      });
    } else {
      await prisma.doorGrooveLines.create({
        data: { ...g, DoorGrooveLinesDoorId: doorId },
      });
    }
  }

  const existingHinges = await prisma.doorHinges.findMany({
    where: { doorHingesDoorId: doorId },
  });
  const hingeIds = new Set(hinges.map((x) => x.doorHingesId).filter(Boolean));
  await prisma.doorHinges.deleteMany({
    where: {
      doorHingesDoorId: doorId,
      doorHingesId: { notIn: Array.from(hingeIds) },
    },
  });
  for (const h of hinges) {
    if (h.doorHingesId) {
      await prisma.doorHinges.update({
        where: { doorHingesId: h.doorHingesId },
        data: {
          doorHingesDistanceFromTop: h.doorHingesDistanceFromTop,
          doorHingesSide: h.doorHingesSide,
        },
      });
    } else {
      await prisma.doorHinges.create({
        data: { ...h, doorHingesDoorId: doorId },
      });
    }
  }

  const existingLocks = await prisma.doorLocks.findMany({
    where: { doorLocksDoorId: doorId },
  });
  const lockIds = new Set(locks.map((x) => x.doorLocksId).filter(Boolean));
  await prisma.doorLocks.deleteMany({
    where: {
      doorLocksDoorId: doorId,
      doorLocksId: { notIn: Array.from(lockIds) },
    },
  });
  for (const l of locks) {
    if (l.doorLocksId) {
      await prisma.doorLocks.update({
        where: { doorLocksId: l.doorLocksId },
        data: {
          doorLocksDistanceFromTop: l.doorLocksDistanceFromTop,
          doorLocksDistanceFromEdge: l.doorLocksDistanceFromEdge,
          doorLocksSide: l.doorLocksSide,
          doorLocksType: l.doorLocksType,
        },
      });
    } else {
      await prisma.doorLocks.create({
        data: { ...l, doorLocksDoorId: doorId },
      });
    }
  }

  const existingLouvers = await prisma.doorLouvers.findMany({
    where: { doorLouversDoorId: doorId },
  });
  const louverIds = new Set(
    louvers.map((x) => x.doorLouversId).filter(Boolean)
  );
  await prisma.doorLouvers.deleteMany({
    where: {
      doorLouversDoorId: doorId,
      doorLouversId: { notIn: Array.from(louverIds) },
    },
  });
  for (const lv of louvers) {
    if (lv.doorLouversId) {
      await prisma.doorLouvers.update({
        where: { doorLouversId: lv.doorLouversId },
        data: lv,
      });
    } else {
      await prisma.doorLouvers.create({
        data: { ...lv, doorLouversDoorId: doorId },
      });
    }
  }

  const existingPanels = await prisma.doorGlassPanels.findMany({
    where: { doorGlassPanelsDoorId: doorId },
  });
  const panelIds = new Set(
    glassPanels.map((x) => x.doorGlassPanelsId).filter(Boolean)
  );
  await prisma.doorGlassPanels.deleteMany({
    where: {
      doorGlassPanelsDoorId: doorId,
      doorGlassPanelsId: { notIn: Array.from(panelIds) },
    },
  });
  for (const gp of glassPanels) {
    if (gp.doorGlassPanelsId) {
      await prisma.doorGlassPanels.update({
        where: { doorGlassPanelsId: gp.doorGlassPanelsId },
        data: gp,
      });
    } else {
      await prisma.doorGlassPanels.create({
        data: { ...gp, doorGlassPanelsDoorId: doorId },
      });
    }
  }

  if (peepHole) {
    const existingPeep = await prisma.doorPeepHole.findUnique({
      where: { doorPeepHoleDoorId: doorId },
    });
    if (existingPeep) {
      await prisma.doorPeepHole.update({
        where: { doorPeepHoleId: existingPeep.doorPeepHoleId },
        data: peepHole,
      });
    } else {
      await prisma.doorPeepHole.create({
        data: { ...peepHole, doorPeepHoleDoorId: doorId },
      });
    }
  }

  if (skeleton) {
    const existingSkeleton = await prisma.doorSkeleton.findUnique({
      where: { doorSkeletonDoorId: doorId },
    });
    let skeletonId;
    if (existingSkeleton) {
      await prisma.doorSkeleton.update({
        where: { doorSkeletonId: existingSkeleton.doorSkeletonId },
        data: {
          doorSkeletonMaterialType: skeleton.doorSkeletonMaterialType,
          doorSkeletonRails: skeleton.doorSkeletonRails,
          doorSkeletonStiles: skeleton.doorSkeletonStiles,
        },
      });
      skeletonId = existingSkeleton.doorSkeletonId;
    } else {
      const created = await prisma.doorSkeleton.create({
        data: {
          doorSkeletonDoorId: doorId,
          doorSkeletonMaterialType: skeleton.doorSkeletonMaterialType,
          doorSkeletonRails: skeleton.doorSkeletonRails,
          doorSkeletonStiles: skeleton.doorSkeletonStiles,
        },
      });
      skeletonId = created.doorSkeletonId;
    }

    const existingRails = await prisma.doorSkeletonRails.findMany({
      where: { doorSkeletonRailsDoorSkeletonId: skeletonId },
    });
    const railIds = new Set(
      skeleton.rails?.map((x) => x.doorSkeletonRailsId).filter(Boolean)
    );
    await prisma.doorSkeletonRails.deleteMany({
      where: {
        doorSkeletonRailsDoorSkeletonId: skeletonId,
        doorSkeletonRailsId: { notIn: Array.from(railIds) },
      },
    });
    for (const r of skeleton.rails || []) {
      if (r.doorSkeletonRailsId) {
        await prisma.doorSkeletonRails.update({
          where: { doorSkeletonRailsId: r.doorSkeletonRailsId },
          data: r,
        });
      } else {
        await prisma.doorSkeletonRails.create({
          data: { ...r, doorSkeletonRailsDoorSkeletonId: skeletonId },
        });
      }
    }

    const existingStiles = await prisma.doorSkeletonStiles.findMany({
      where: { doorSkeletonStilesDoorSkeletonId: skeletonId },
    });
    const stileIds = new Set(
      skeleton.stiles?.map((x) => x.doorSkeletonStilesId).filter(Boolean)
    );
    await prisma.doorSkeletonStiles.deleteMany({
      where: {
        doorSkeletonStilesDoorSkeletonId: skeletonId,
        doorSkeletonStilesId: { notIn: Array.from(stileIds) },
      },
    });
    for (const s of skeleton.stiles || []) {
      if (s.doorSkeletonStilesId) {
        await prisma.doorSkeletonStiles.update({
          where: { doorSkeletonStilesId: s.doorSkeletonStilesId },
          data: s,
        });
      } else {
        await prisma.doorSkeletonStiles.create({
          data: { ...s, doorSkeletonStilesDoorSkeletonId: skeletonId },
        });
      }
    }

    if (skeleton.lockSet) {
      const existingLockSet = await prisma.doorSkeletonLockSet.findUnique({
        where: { doorSkeletonLockSetDoorSkeletonId: skeletonId },
      });
      if (existingLockSet) {
        await prisma.doorSkeletonLockSet.update({
          where: {
            doorSkeletonLockSetId: existingLockSet.doorSkeletonLockSetId,
          },
          data: skeleton.lockSet,
        });
      } else {
        await prisma.doorSkeletonLockSet.create({
          data: {
            ...skeleton.lockSet,
            doorSkeletonLockSetDoorSkeletonId: skeletonId,
          },
        });
      }
    }
  }

  return DoorService.update(doorId, {
    ...parsed.data,
    doorProjectName: parsed.data.doorProjectName.trim().toLowerCase(),
    doorUpdateAt: getLocalNow(),
  });
}
