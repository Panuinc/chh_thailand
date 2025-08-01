import { NextResponse } from "next/server";
import { CreateRackUseCase } from "../useCases/createRack.usecase";
import { UpdateRackUseCase } from "../useCases/updateRack.usecase";
import { GetAllRackUseCase } from "../useCases/getAllRack.usecase";
import { GetRackByIdUseCase } from "../useCases/getRackById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatRackData } from "../schemas/rack.schema";
import logger from "@/lib/logger";

export async function getAllRack(request) {
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
      message: "📥 Fetching all racks",
      action: "getAllRack",
      page,
      limit,
    });

    const { racks, total } = await GetAllRackUseCase(page, limit);

    logger.info({
      message: "✅ Racks retrieved",
      total,
      count: racks.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved racks",
      total,
      page,
      limit,
      rack: formatRackData(racks),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve racks");
  }
}

export async function getRackById(request, rackId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching rack by ID",
      action: "getRackById",
      rackId,
    });

    const rack = await GetRackByIdUseCase(rackId);

    logger.info({ message: "✅ Rack found", rackId, ip });

    return NextResponse.json({
      message: "Successfully retrieved rack",
      rack: formatRackData([rack]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve rack");
  }
}

export async function createRack(request) {
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

    logger.info({ message: "📝 Parsing create rack form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const rack = await CreateRackUseCase(formData);

    logger.info({
      action: "createRack",
      message: `✅ Rack '${rack.rackName}' created`,
      createdBy: rack.rackCreateBy,
      ip,
      rack,
    });

    return NextResponse.json(
      { message: "Rack created successfully", rack },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createRack",
      message: "🔥 Failed to create rack",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create rack");
  }
}

export async function updateRack(request, rackId) {
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

    logger.info({ message: "📝 Parsing update rack form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const rack = await UpdateRackUseCase({ ...formData, rackId });

    logger.info({
      action: "updateRack",
      message: `✅ Rack ID ${rackId} updated`,
      updatedBy: rack.rackUpdateBy,
      ip,
      rack,
    });

    return NextResponse.json(
      { message: "Rack updated successfully", rack },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateRack",
      message: "🔥 Failed to update rack",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update rack");
  }
}
