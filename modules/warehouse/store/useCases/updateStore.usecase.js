import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";
import prisma from "@/lib/prisma";

export async function UpdateStoreUseCase(data) {
  if (typeof data.storeZones === "string") {
    try {
      data.storeZones = JSON.parse(data.storeZones);
    } catch {
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

  const { storeId, storeZones, ...rest } = parsed.data;

  const existing = await StoreService.getById(storeId);
  if (!existing) {
    throw { status: 404, message: "Store not found" };
  }

  const normalizedCode = rest.storeCode.trim().toLowerCase();
  const duplicateCode = await StoreValidator.isDuplicateStoreCodeExceptSelf(
    normalizedCode,
    storeId
  );
  if (duplicateCode) {
    throw {
      status: 409,
      message: `Store code '${normalizedCode}' already exists`,
    };
  }

  await prisma.store.update({
    where: { storeId },
    data: {
      ...rest,
      storeCode: normalizedCode,
      storeName: rest.storeName.trim().toLowerCase(),
      storeUpdateAt: getLocalNow(),
    },
  });

  await prisma.zone.deleteMany({
    where: { zoneStoreId: storeId },
  });

  for (const zone of storeZones || []) {
    await prisma.zone.create({
      data: {
        ...zone,
        zoneCode: zone.zoneCode.trim().toLowerCase(),
        zoneName: zone.zoneName.trim().toLowerCase(),
        zoneStoreId: storeId,
      },
    });
  }

  return { success: true };
}
