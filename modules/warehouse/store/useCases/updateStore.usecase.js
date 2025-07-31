import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";
import prisma from "@/lib/prisma";

export async function UpdateStoreUseCase(data) {
  if (typeof data.storeZones === "string") {
    try {
      data.storeZones = JSON.parse(data.storeZones);
    } catch (e) {
      data.storeZones = [];
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
    storeZones,
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
    where: { zoneStoreId: storeId },
  });

  const submittedIds = new Set(
    storeZones
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

  for (const zone of storeZones) {
    if (zone.zoneId) {
      await prisma.zone.update({
        where: { zoneId: Number(zone.zoneId) },
        data: {
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription,
          zoneStatus: zone.zoneStatus,
          zoneUpdateAt: getLocalNow(),
          zoneUpdateBy: storeUpdateBy,
        },
      });
    } else {
      await prisma.zone.create({
        data: {
          zoneStoreId: storeId,
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription,
          zoneStatus: zone.zoneStatus,
          zoneCreateAt: getLocalNow(),
          zoneCreateBy: storeUpdateBy,
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
    storeUpdateBy: storeUpdateBy,
  });
}
