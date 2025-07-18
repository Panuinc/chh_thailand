import { NextResponse } from "next/server";
import { CreateDivisionUseCase } from "../useCases/createDivision.usecase";
import { UpdateDivisionUseCase } from "../useCases/updateDivision.usecase";
import { GetAllDivisionUseCase } from "../useCases/getAllDivision.usecase";
import { GetDivisionByIdUseCase } from "../useCases/getDivisionById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatDivisionData } from "../schemas/division.schema";
import logger from "@/lib/logger";

export async function getAllDivision(request) {
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
      message: "📥 Fetching all divisions",
      action: "getAllDivision",
      page,
      limit,
    });

    const { divisions, total } = await GetAllDivisionUseCase(page, limit);

    logger.info({
      message: "✅ Divisions retrieved",
      total,
      count: divisions.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved divisions",
      total,
      page,
      limit,
      division: formatDivisionData(divisions),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve divisions");
  }
}

export async function getDivisionById(request, divisionId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching division by ID",
      action: "getDivisionById",
      divisionId,
    });

    const division = await GetDivisionByIdUseCase(divisionId);

    logger.info({ message: "✅ Division found", divisionId, ip });

    return NextResponse.json({
      message: "Successfully retrieved division",
      division: formatDivisionData([division]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve division");
  }
}

export async function createDivision(request) {
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

    logger.info({ message: "📝 Parsing create division form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const division = await CreateDivisionUseCase(formData);

    logger.info({
      action: "createDivision",
      message: `✅ Division '${division.divisionName}' created`,
      createdBy: division.divisionCreateBy,
      ip,
      division,
    });

    return NextResponse.json(
      { message: "Division created successfully", division },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createDivision",
      message: "🔥 Failed to create division",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create division");
  }
}

export async function updateDivision(request, divisionId) {
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

    logger.info({ message: "📝 Parsing update division form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const division = await UpdateDivisionUseCase({ ...formData, divisionId });

    logger.info({
      action: "updateDivision",
      message: `✅ Division ID ${divisionId} updated`,
      updatedBy: division.divisionUpdateBy,
      ip,
      division,
    });

    return NextResponse.json(
      { message: "Division updated successfully", division },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateDivision",
      message: "🔥 Failed to update division",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update division");
  }
}
