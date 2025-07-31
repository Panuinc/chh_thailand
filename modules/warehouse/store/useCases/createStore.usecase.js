import { storePostSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateStoreUseCase(data) {
  if (typeof data.storeLeaders === "string") {
    try {
      data.storeLeaders = JSON.parse(data.storeLeaders);
    } catch (e) {
      data.storeLeaders = [];
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

  const normalizedTax = parsed.data.storeTax.trim();
  const normalizedBranch = parsed.data.storeBranch.trim();

  const duplicate = await StoreValidator.isDuplicateStoreTaxBranch(
    normalizedTax,
    normalizedBranch
  );

  if (duplicate) {
    throw {
      status: 409,
      message: `Store with Tax ID '${normalizedTax}' and Branch '${normalizedBranch}' already exists`,
    };
  }

  return StoreService.create({
    storeTax: normalizedTax,
    storeName: parsed.data.storeName.trim(),
    storeBranch: normalizedBranch,
    storeAddress: parsed.data.storeAddress.trim(),
    storePhone: parsed.data.storePhone.trim(),
    storeType: parsed.data.storeType,
    storeCreateAt: getLocalNow(),
    createdBy: {
      connect: { userId: parsed.data.storeCreateBy },
    },
    leaders: {
      create:
        parsed.data.storeLeaders?.map((leader) => ({
          ...leader,
          storeLeaderCreateBy: parsed.data.storeCreateBy,
          storeLeaderCreateAt: getLocalNow(),
        })) ?? [],
    },
  });
}
