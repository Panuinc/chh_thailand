import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";
import prisma from "@/lib/prisma";

export async function UpdateStoreUseCase(data) {
  if (typeof data.zones === "string") {
    try {
      data.zones = JSON.parse(data.zones);
    } catch (e) {
      data.zones = [];
    }
  }

  const parsed = storePutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    storeId,
    zones,
    storeUpdateBy,
    storeCode,
    storeName,
    storeLocation,
    storeDescription,
    storeStatus,
  } = parsed.data;

  const existing = await StoreService.getById(storeId);
  if (!existing) {
    throw { status: 404, message: "Store not found" };
  }

  const normalizedCode = storeCode.trim();

  if (normalizedCode !== existing.storeCode) {
    const duplicate = await StoreValidator.isDuplicateStoreCode(normalizedCode);
    if (duplicate) {
      throw {
        status: 409,
        message: `Store with code '${normalizedCode}' already exists`,
      };
    }
  }

  const currentZones = await prisma.zone.findMany({
    where: { storeId },
  });

  const submittedIds = new Set(
    zones
      .map((z) => Number(z.zoneId))
      .filter((id) => Number.isInteger(id) && id > 0)
  );

  const toDelete = currentZones.filter(
    (zone) => !submittedIds.has(zone.zoneId)
  );

  await prisma.zone.deleteMany({
    where: {
      zoneId: { in: toDelete.map((z) => z.zoneId) },
    },
  });

  for (const zone of zones) {
    if (zone.zoneId) {
      await prisma.zone.update({
        where: { zoneId: Number(zone.zoneId) },
        data: {
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription,
          zoneStatus: zone.zoneStatus,
          zoneUpdateAt: getLocalNow(),
          updatedBy: {
            connect: { userId: storeUpdateBy },
          },
        },
      });
    } else {
      await prisma.zone.create({
        data: {
          storeId,
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription,
          zoneStatus: zone.zoneStatus,
          zoneCreateAt: getLocalNow(),
          createdBy: {
            connect: { userId: storeUpdateBy },
          },
        },
      });
    }
  }

  return StoreService.update(storeId, {
    storeCode: normalizedCode,
    storeName: storeName.trim(),
    storeLocation: storeLocation.trim(),
    storeDescription: storeDescription.trim(),
    storeStatus,
    storeUpdateAt: getLocalNow(),
    updatedBy: {
      connect: { userId: storeUpdateBy },
    },
  });
}
