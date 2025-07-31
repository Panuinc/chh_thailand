import { storePostSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateStoreUseCase(data) {
  if (typeof data.zones === "string") {
    try {
      data.zones = JSON.parse(data.zones);
    } catch (e) {
      data.zones = [];
    }
  }

  const parsed = storePostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedCode = parsed.data.storeCode.trim();

  const duplicate = await StoreValidator.isDuplicateStoreCode(normalizedCode);
  if (duplicate) {
    throw {
      status: 409,
      message: `Store with code '${normalizedCode}' already exists`,
    };
  }

  return StoreService.create({
    storeCode: normalizedCode,
    storeName: parsed.data.storeName.trim(),
    storeLocation: parsed.data.storeLocation.trim(),
    storeDescription: parsed.data.storeDescription.trim(),
    storeStatus: parsed.data.storeStatus,
    storeCreateAt: getLocalNow(),
    createdBy: {
      connect: { userId: parsed.data.storeCreateBy },
    },
    zones: {
      create:
        parsed.data.zones?.map((zone) => ({
          zoneCode: zone.zoneCode,
          zoneName: zone.zoneName,
          zoneDescription: zone.zoneDescription,
          zoneStatus: zone.zoneStatus,
          zoneCreateAt: getLocalNow(),
          createdBy: {
            connect: { userId: parsed.data.storeCreateBy },
          },
        })) ?? [],
    },
  });
}
