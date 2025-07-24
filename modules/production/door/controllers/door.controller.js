import { NextResponse } from "next/server";
import { CreateDoorUseCase } from "../useCases/createDoor.usecase";
import { UpdateDoorUseCase } from "../useCases/updateDoor.usecase";
import { GetAllDoorUseCase } from "../useCases/getAllDoor.usecase";
import { GetDoorByIdUseCase } from "../useCases/getDoorById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatDoorData } from "../schemas/door.schema";
import logger from "@/lib/logger";

export async function getAllDoor(request) {
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
      message: "📥 Fetching all doors",
      action: "getAllDoor",
      page,
      limit,
    });

    const { doors, total } = await GetAllDoorUseCase(page, limit);

    logger.info({
      message: "✅ Doors retrieved",
      total,
      count: doors.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved doors",
      total,
      page,
      limit,
      door: formatDoorData(doors),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve doors");
  }
}

export async function getDoorById(request, doorId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching door by ID",
      action: "getDoorById",
      doorId,
    });

    const door = await GetDoorByIdUseCase(doorId);

    logger.info({ message: "✅ Door found", doorId, ip });

    return NextResponse.json({
      message: "Successfully retrieved door",
      door: formatDoorData([door]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve door");
  }
}

export async function createDoor(request) {
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

    logger.info({ message: "📝 Parsing create door form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const door = await CreateDoorUseCase(formData);

    logger.info({
      action: "createDoor",
      message: `✅ Door '${door.doorName}' created`,
      createdBy: door.doorCreateBy,
      ip,
      door,
    });

    return NextResponse.json(
      { message: "Door created successfully", door },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createDoor",
      message: "🔥 Failed to create door",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create door");
  }
}

export async function updateDoor(request, doorId) {
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

    logger.info({ message: "📝 Parsing update door form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const door = await UpdateDoorUseCase({ ...formData, doorId });

    logger.info({
      action: "updateDoor",
      message: `✅ Door ID ${doorId} updated`,
      updatedBy: door.doorUpdateBy,
      ip,
      door,
    });

    return NextResponse.json(
      { message: "Door updated successfully", door },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateDoor",
      message: "🔥 Failed to update door",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update door");
  }
}
