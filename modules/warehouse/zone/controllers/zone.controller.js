import { NextResponse } from "next/server";
import { CreateZoneUseCase } from "../useCases/createZone.usecase";
import { UpdateZoneUseCase } from "../useCases/updateZone.usecase";
import { GetAllZoneUseCase } from "../useCases/getAllZone.usecase";
import { GetZoneByIdUseCase } from "../useCases/getZoneById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatZoneData } from "../schemas/zone.schema";
import logger from "@/lib/logger";

export async function getAllZone(request) {
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
      message: "📥 Fetching all zones",
      action: "getAllZone",
      page,
      limit,
    });

    const { zones, total } = await GetAllZoneUseCase(page, limit);

    logger.info({
      message: "✅ Zones retrieved",
      total,
      count: zones.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved zones",
      total,
      page,
      limit,
      zone: formatZoneData(zones),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve zones");
  }
}

export async function getZoneById(request, zoneId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching zone by ID",
      action: "getZoneById",
      zoneId,
    });

    const zone = await GetZoneByIdUseCase(zoneId);

    logger.info({ message: "✅ Zone found", zoneId, ip });

    return NextResponse.json({
      message: "Successfully retrieved zone",
      zone: formatZoneData([zone]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve zone");
  }
}

export async function createZone(request) {
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

    logger.info({ message: "📝 Parsing create zone form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const zone = await CreateZoneUseCase(formData);

    logger.info({
      action: "createZone",
      message: `✅ Zone '${zone.zoneName}' created`,
      createdBy: zone.zoneCreateBy,
      ip,
      zone,
    });

    return NextResponse.json(
      { message: "Zone created successfully", zone },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createZone",
      message: "🔥 Failed to create zone",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create zone");
  }
}

export async function updateZone(request, zoneId) {
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

    logger.info({ message: "📝 Parsing update zone form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const zone = await UpdateZoneUseCase({ ...formData, zoneId });

    logger.info({
      action: "updateZone",
      message: `✅ Zone ID ${zoneId} updated`,
      updatedBy: zone.zoneUpdateBy,
      ip,
      zone,
    });

    return NextResponse.json(
      { message: "Zone updated successfully", zone },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateZone",
      message: "🔥 Failed to update zone",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update zone");
  }
}
