import { NextResponse } from "next/server";
import { CreateLevelUseCase } from "../useCases/createLevel.usecase";
import { UpdateLevelUseCase } from "../useCases/updateLevel.usecase";
import { GetAllLevelUseCase } from "../useCases/getAllLevel.usecase";
import { GetLevelByIdUseCase } from "../useCases/getLevelById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatLevelData } from "../schemas/level.schema";
import logger from "@/lib/logger";

export async function getAllLevel(request) {
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
      message: "📥 Fetching all levels",
      action: "getAllLevel",
      page,
      limit,
    });

    const { levels, total } = await GetAllLevelUseCase(page, limit);

    logger.info({
      message: "✅ Levels retrieved",
      total,
      count: levels.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved levels",
      total,
      page,
      limit,
      level: formatLevelData(levels),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve levels");
  }
}

export async function getLevelById(request, levelId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching level by ID",
      action: "getLevelById",
      levelId,
    });

    const level = await GetLevelByIdUseCase(levelId);

    logger.info({ message: "✅ Level found", levelId, ip });

    return NextResponse.json({
      message: "Successfully retrieved level",
      level: formatLevelData([level]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve level");
  }
}

export async function createLevel(request) {
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

    logger.info({ message: "📝 Parsing create level form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const level = await CreateLevelUseCase(formData);

    logger.info({
      action: "createLevel",
      message: `✅ Level '${level.levelName}' created`,
      createdBy: level.levelCreateBy,
      ip,
      level,
    });

    return NextResponse.json(
      { message: "Level created successfully", level },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createLevel",
      message: "🔥 Failed to create level",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create level");
  }
}

export async function updateLevel(request, levelId) {
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

    logger.info({ message: "📝 Parsing update level form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const level = await UpdateLevelUseCase({ ...formData, levelId });

    logger.info({
      action: "updateLevel",
      message: `✅ Level ID ${levelId} updated`,
      updatedBy: level.levelUpdateBy,
      ip,
      level,
    });

    return NextResponse.json(
      { message: "Level updated successfully", level },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateLevel",
      message: "🔥 Failed to update level",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update level");
  }
}
