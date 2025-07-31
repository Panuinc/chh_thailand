import { NextResponse } from "next/server";
import { CreateStoreUseCase } from "../useCases/createStore.usecase";
import { UpdateStoreUseCase } from "../useCases/updateStore.usecase";
import { GetAllStoreUseCase } from "../useCases/getAllStore.usecase";
import { GetStoreByIdUseCase } from "../useCases/getStoreById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatStoreData } from "../schemas/store.schema";
import logger from "@/lib/logger";

export async function getAllStore(request) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "1000000", 10);

    logger.info({
      message: "📥 Fetching all stores",
      action: "getAllStore",
      page,
      limit,
    });

    const { stores, total } = await GetAllStoreUseCase(page, limit);

    logger.info({
      message: "✅ Stores retrieved",
      total,
      count: stores.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved stores",
      total,
      page,
      limit,
      store: formatStoreData(stores),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve stores");
  }
}

export async function getStoreById(request, storeId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching store by ID",
      action: "getStoreById",
      storeId,
    });

    const store = await GetStoreByIdUseCase(storeId);

    logger.info({ message: "✅ Store found", storeId, ip });

    return NextResponse.json({
      message: "Successfully retrieved store",
      store: formatStoreData([store]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve store");
  }
}

export async function createStore(request) {
  let ip = "";
  try {
    if (request.method !== "POST") {
      logger.warn({ message: "⚠️ Method not allowed", method: request.method });
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({ message: "📝 Parsing create store form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const store = await CreateStoreUseCase(formData);

    logger.info({
      action: "createStore",
      message: `✅ Store '${store.storeName}' created`,
      createdBy: store.storeCreateBy,
      ip,
      store,
    });

    return NextResponse.json(
      { message: "Store created successfully", store },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createStore",
      message: "🔥 Failed to create store",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create store");
  }
}

export async function updateStore(request, storeId) {
  let ip = "";
  try {
    if (request.method !== "PUT") {
      logger.warn({ message: "⚠️ Method not allowed", method: request.method });
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({ message: "📝 Parsing update store form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const store = await UpdateStoreUseCase({ ...formData, storeId });

    logger.info({
      action: "updateStore",
      message: `✅ Store ID ${storeId} updated`,
      updatedBy: store.storeUpdateBy,
      ip,
      store,
    });

    return NextResponse.json(
      { message: "Store updated successfully", store },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateStore",
      message: "🔥 Failed to update store",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update store");
  }
}
