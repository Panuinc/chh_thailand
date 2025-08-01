import { NextResponse } from "next/server";
import { CreateAisleUseCase } from "../useCases/createAisle.usecase";
import { UpdateAisleUseCase } from "../useCases/updateAisle.usecase";
import { GetAllAisleUseCase } from "../useCases/getAllAisle.usecase";
import { GetAisleByIdUseCase } from "../useCases/getAisleById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatAisleData } from "../schemas/aisle.schema";
import logger from "@/lib/logger";

export async function getAllAisle(request) {
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
      message: "📥 Fetching all aisles",
      action: "getAllAisle",
      page,
      limit,
    });

    const { aisles, total } = await GetAllAisleUseCase(page, limit);

    logger.info({
      message: "✅ Aisles retrieved",
      total,
      count: aisles.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved aisles",
      total,
      page,
      limit,
      aisle: formatAisleData(aisles),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve aisles");
  }
}

export async function getAisleById(request, aisleId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching aisle by ID",
      action: "getAisleById",
      aisleId,
    });

    const aisle = await GetAisleByIdUseCase(aisleId);

    logger.info({ message: "✅ Aisle found", aisleId, ip });

    return NextResponse.json({
      message: "Successfully retrieved aisle",
      aisle: formatAisleData([aisle]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve aisle");
  }
}

export async function createAisle(request) {
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

    logger.info({ message: "📝 Parsing create aisle form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const aisle = await CreateAisleUseCase(formData);

    logger.info({
      action: "createAisle",
      message: `✅ Aisle '${aisle.aisleName}' created`,
      createdBy: aisle.aisleCreateBy,
      ip,
      aisle,
    });

    return NextResponse.json(
      { message: "Aisle created successfully", aisle },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createAisle",
      message: "🔥 Failed to create aisle",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create aisle");
  }
}

export async function updateAisle(request, aisleId) {
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

    logger.info({ message: "📝 Parsing update aisle form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const aisle = await UpdateAisleUseCase({ ...formData, aisleId });

    logger.info({
      action: "updateAisle",
      message: `✅ Aisle ID ${aisleId} updated`,
      updatedBy: aisle.aisleUpdateBy,
      ip,
      aisle,
    });

    return NextResponse.json(
      { message: "Aisle updated successfully", aisle },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateAisle",
      message: "🔥 Failed to update aisle",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update aisle");
  }
}
