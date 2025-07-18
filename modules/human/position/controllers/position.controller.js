import { NextResponse } from "next/server";
import { CreatePositionUseCase } from "../useCases/createPosition.usecase";
import { UpdatePositionUseCase } from "../useCases/updatePosition.usecase";
import { GetAllPositionUseCase } from "../useCases/getAllPosition.usecase";
import { GetPositionByIdUseCase } from "../useCases/getPositionById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatPositionData } from "../schemas/position.schema";
import logger from "@/lib/logger";

export async function getAllPosition(request) {
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
      message: "📥 Fetching all positions",
      action: "getAllPosition",
      page,
      limit,
    });

    const { positions, total } = await GetAllPositionUseCase(page, limit);

    logger.info({
      message: "✅ Positions retrieved",
      total,
      count: positions.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved positions",
      total,
      page,
      limit,
      position: formatPositionData(positions),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve positions");
  }
}

export async function getPositionById(request, positionId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching position by ID",
      action: "getPositionById",
      positionId,
    });

    const position = await GetPositionByIdUseCase(positionId);

    logger.info({ message: "✅ Position found", positionId, ip });

    return NextResponse.json({
      message: "Successfully retrieved position",
      position: formatPositionData([position]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve position");
  }
}

export async function createPosition(request) {
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

    logger.info({ message: "📝 Parsing create position form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const position = await CreatePositionUseCase(formData);

    logger.info({
      action: "createPosition",
      message: `✅ Position '${position.positionName}' created`,
      createdBy: position.positionCreateBy,
      ip,
      position,
    });

    return NextResponse.json(
      { message: "Position created successfully", position },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createPosition",
      message: "🔥 Failed to create position",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create position");
  }
}

export async function updatePosition(request, positionId) {
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

    logger.info({ message: "📝 Parsing update position form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const position = await UpdatePositionUseCase({ ...formData, positionId });

    logger.info({
      action: "updatePosition",
      message: `✅ Position ID ${positionId} updated`,
      updatedBy: position.positionUpdateBy,
      ip,
      position,
    });

    return NextResponse.json(
      { message: "Position updated successfully", position },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updatePosition",
      message: "🔥 Failed to update position",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update position");
  }
}
