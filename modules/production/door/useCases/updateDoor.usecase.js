import { doorPutSchema } from "../schemas/door.schema";
import { DoorService } from "../services/door.service";
import prisma from "@/lib/prisma";
import { getLocalNow } from "@/lib/getLocalNow";

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
  for (const field of nestedFields) {
    if (typeof data[field] === "string") {
      try {
        data[field] = JSON.parse(data[field]);
      } catch {
        data[field] = undefined;
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
    ...core
  } = parsed.data;

  const existing = await DoorService.getById(doorId);
  if (!existing) throw { status: 404, message: "Door not found" };

  const currentGrooves = await prisma.doorGrooveLines.findMany({
    where: { doorId },
  });
  const grooveIds = new Set(
    grooveLines.map((g) => g.doorGrooveLinesId).filter((id) => id)
  );
  const groovesToDelete = currentGrooves.filter(
    (g) => !grooveIds.has(g.doorGrooveLinesId)
  );
  await prisma.doorGrooveLines.deleteMany({
    where: {
      doorGrooveLinesId: {
        in: groovesToDelete.map((g) => g.doorGrooveLinesId),
      },
    },
  });
  for (const g of grooveLines) {
    if (g.doorGrooveLinesId) {
      await prisma.doorGrooveLines.update({
        where: { doorGrooveLinesId: g.doorGrooveLinesId },
        data: g,
      });
    } else {
      await prisma.doorGrooveLines.create({ data: { ...g, doorId } });
    }
  }

  const currentHinges = await prisma.doorHinges.findMany({ where: { doorId } });
  const hingeIds = new Set(
    hinges.map((h) => h.doorHingesId).filter((id) => id)
  );
  const hingesToDelete = currentHinges.filter(
    (h) => !hingeIds.has(h.doorHingesId)
  );
  await prisma.doorHinges.deleteMany({
    where: { doorHingesId: { in: hingesToDelete.map((h) => h.doorHingesId) } },
  });
  for (const h of hinges) {
    if (h.doorHingesId) {
      await prisma.doorHinges.update({
        where: { doorHingesId: h.doorHingesId },
        data: h,
      });
    } else {
      await prisma.doorHinges.create({ data: { ...h, doorId } });
    }
  }

  const currentLocks = await prisma.doorLocks.findMany({ where: { doorId } });
  const lockIds = new Set(locks.map((l) => l.doorLocksId).filter((id) => id));
  const locksToDelete = currentLocks.filter((l) => !lockIds.has(l.doorLocksId));
  await prisma.doorLocks.deleteMany({
    where: { doorLocksId: { in: locksToDelete.map((l) => l.doorLocksId) } },
  });
  for (const l of locks) {
    if (l.doorLocksId) {
      await prisma.doorLocks.update({
        where: { doorLocksId: l.doorLocksId },
        data: l,
      });
    } else {
      await prisma.doorLocks.create({ data: { ...l, doorId } });
    }
  }

  const currentLouvers = await prisma.doorLouvers.findMany({
    where: { doorId },
  });
  const louverIds = new Set(
    louvers.map((x) => x.doorLouversId).filter((id) => id)
  );
  const louversToDelete = currentLouvers.filter(
    (x) => !louverIds.has(x.doorLouversId)
  );
  await prisma.doorLouvers.deleteMany({
    where: {
      doorLouversId: { in: louversToDelete.map((x) => x.doorLouversId) },
    },
  });
  for (const x of louvers) {
    if (x.doorLouversId) {
      await prisma.doorLouvers.update({
        where: { doorLouversId: x.doorLouversId },
        data: x,
      });
    } else {
      await prisma.doorLouvers.create({ data: { ...x, doorId } });
    }
  }

  const currentPanels = await prisma.doorGlassPanels.findMany({
    where: { doorId },
  });
  const panelIds = new Set(
    glassPanels.map((x) => x.doorGlassPanelsId).filter((id) => id)
  );
  const panelsToDelete = currentPanels.filter(
    (x) => !panelIds.has(x.doorGlassPanelsId)
  );
  await prisma.doorGlassPanels.deleteMany({
    where: {
      doorGlassPanelsId: { in: panelsToDelete.map((x) => x.doorGlassPanelsId) },
    },
  });
  for (const x of glassPanels) {
    if (x.doorGlassPanelsId) {
      await prisma.doorGlassPanels.update({
        where: { doorGlassPanelsId: x.doorGlassPanelsId },
        data: x,
      });
    } else {
      await prisma.doorGlassPanels.create({ data: { ...x, doorId } });
    }
  }

  await prisma.doorPeepHole.deleteMany({ where: { doorId } });
  if (peepHole) {
    await prisma.doorPeepHole.create({ data: { ...peepHole, doorId } });
  }

  await prisma.doorSkeletonLockSet.deleteMany({
    where: { doorSkeleton: { doorId } },
  });
  await prisma.doorSkeletonRails.deleteMany({
    where: { doorSkeleton: { doorId } },
  });
  await prisma.doorSkeletonStiles.deleteMany({
    where: { doorSkeleton: { doorId } },
  });
  await prisma.doorSkeleton.deleteMany({ where: { doorId } });

  if (skeleton) {
    const { rails = [], stiles = [], lockSet, ...sk } = skeleton;
    const created = await prisma.doorSkeleton.create({
      data: { ...sk, doorId },
    });

    for (const r of rails) {
      await prisma.doorSkeletonRails.create({
        data: { ...r, doorSkeletonId: created.doorSkeletonId },
      });
    }

    for (const s of stiles) {
      await prisma.doorSkeletonStiles.create({
        data: { ...s, doorSkeletonId: created.doorSkeletonId },
      });
    }

    if (lockSet) {
      await prisma.doorSkeletonLockSet.create({
        data: { ...lockSet, doorSkeletonId: created.doorSkeletonId },
      });
    }
  }

  return DoorService.update(doorId, {
    ...core,
    doorProjectName: core.doorProjectName.trim().toLowerCase(),
    doorUpdateAt: getLocalNow(),
    updatedBy: { connect: { userId: doorUpdateBy } },
  });
}
