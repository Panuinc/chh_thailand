import { NextResponse } from "next/server";
import { CreateBinUseCase } from "../useCases/createBin.usecase";
import { UpdateBinUseCase } from "../useCases/updateBin.usecase";
import { GetAllBinUseCase } from "../useCases/getAllBin.usecase";
import { GetBinByIdUseCase } from "../useCases/getBinById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatBinData } from "../schemas/bin.schema";
import logger from "@/lib/logger";

export async function getAllBin(request) {
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
      message: "📥 Fetching all bins",
      action: "getAllBin",
      page,
      limit,
    });

    const { bins, total } = await GetAllBinUseCase(page, limit);

    logger.info({
      message: "✅ Bins retrieved",
      total,
      count: bins.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved bins",
      total,
      page,
      limit,
      bin: formatBinData(bins),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve bins");
  }
}

export async function getBinById(request, binId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching bin by ID",
      action: "getBinById",
      binId,
    });

    const bin = await GetBinByIdUseCase(binId);

    logger.info({ message: "✅ Bin found", binId, ip });

    return NextResponse.json({
      message: "Successfully retrieved bin",
      bin: formatBinData([bin]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve bin");
  }
}

export async function createBin(request) {
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

    logger.info({ message: "📝 Parsing create bin form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const bin = await CreateBinUseCase(formData);

    logger.info({
      action: "createBin",
      message: `✅ Bin '${bin.binName}' created`,
      createdBy: bin.binCreateBy,
      ip,
      bin,
    });

    return NextResponse.json(
      { message: "Bin created successfully", bin },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createBin",
      message: "🔥 Failed to create bin",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create bin");
  }
}

export async function updateBin(request, binId) {
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

    logger.info({ message: "📝 Parsing update bin form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const bin = await UpdateBinUseCase({ ...formData, binId });

    logger.info({
      action: "updateBin",
      message: `✅ Bin ID ${binId} updated`,
      updatedBy: bin.binUpdateBy,
      ip,
      bin,
    });

    return NextResponse.json(
      { message: "Bin updated successfully", bin },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateBin",
      message: "🔥 Failed to update bin",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update bin");
  }
}
