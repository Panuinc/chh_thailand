import { storePutSchema } from "../schemas/store.schema";
import { StoreService } from "../services/store.service";
import { StoreValidator } from "../validators/store.validator";
import { getLocalNow } from "@/lib/getLocalNow";
import prisma from "@/lib/prisma";

export async function UpdateStoreUseCase(data) {
  if (typeof data.storeLeaders === "string") {
    try {
      data.storeLeaders = JSON.parse(data.storeLeaders);
    } catch (e) {
      data.storeLeaders = [];
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
    storeLeaders,
    storeUpdateBy,
    storeTax,
    storeBranch,
    storeName,
    storeAddress,
    storePhone,
    storeType,
    storeStatus,
  } = parsed.data;

  const existing = await StoreService.getById(storeId);
  if (!existing) {
    throw { status: 404, message: "Store not found" };
  }

  const normalizedTax = storeTax.trim();
  const normalizedBranch = storeBranch.trim();

  if (
    normalizedTax !== existing.storeTax ||
    normalizedBranch !== existing.storeBranch
  ) {
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
  }

  const currentLeaders = await prisma.storeLeader.findMany({
    where: { storeId },
  });

  const submittedIds = new Set(
    storeLeaders
      .map((l) => Number(l.storeLeaderId))
      .filter((id) => Number.isInteger(id) && id > 0)
  );

  const toDelete = currentLeaders.filter(
    (leader) => !submittedIds.has(leader.storeLeaderId)
  );

  await prisma.storeLeader.deleteMany({
    where: {
      storeLeaderId: { in: toDelete.map((l) => l.storeLeaderId) },
    },
  });

  for (const leader of storeLeaders) {
    if (leader.storeLeaderId) {
      await prisma.storeLeader.update({
        where: { storeLeaderId: Number(leader.storeLeaderId) },
        data: {
          storeLeaderName: leader.storeLeaderName,
          storeLeaderEmail: leader.storeLeaderEmail,
          storeLeaderPhone: leader.storeLeaderPhone,
          storeLeaderIsDecisionMaker: leader.storeLeaderIsDecisionMaker,
          storeLeaderUpdateBy: storeUpdateBy,
          storeLeaderUpdateAt: getLocalNow(),
        },
      });
    } else {
      await prisma.storeLeader.create({
        data: {
          storeId,
          storeLeaderName: leader.storeLeaderName,
          storeLeaderEmail: leader.storeLeaderEmail,
          storeLeaderPhone: leader.storeLeaderPhone,
          storeLeaderIsDecisionMaker: leader.storeLeaderIsDecisionMaker,
          storeLeaderCreateBy: storeUpdateBy,
          storeLeaderCreateAt: getLocalNow(),
        },
      });
    }
  }

  return StoreService.update(storeId, {
    storeTax: normalizedTax,
    storeName: storeName.trim(),
    storeBranch: normalizedBranch,
    storeAddress: storeAddress.trim(),
    storePhone: storePhone.trim(),
    storeType,
    storeStatus,
    storeUpdateAt: getLocalNow(),
    updatedBy: {
      connect: { userId: storeUpdateBy },
    },
  });
}
