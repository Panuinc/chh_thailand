import { NextResponse } from "next/server";
import { CreatePartnerUseCase } from "../useCases/createPartner.usecase";
import { UpdatePartnerUseCase } from "../useCases/updatePartner.usecase";
import { GetAllPartnerUseCase } from "../useCases/getAllPartner.usecase";
import { GetPartnerByIdUseCase } from "../useCases/getPartnerById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatPartnerData } from "../schemas/partner.schema";
import logger from "@/lib/logger";

export async function getAllPartner(request) {
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
      message: "📥 Fetching all partners",
      action: "getAllPartner",
      page,
      limit,
    });

    const { partners, total } = await GetAllPartnerUseCase(page, limit);

    logger.info({
      message: "✅ Partners retrieved",
      total,
      count: partners.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved partners",
      total,
      page,
      limit,
      partner: formatPartnerData(partners),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve partners");
  }
}

export async function getPartnerById(request, partnerId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching partner by ID",
      action: "getPartnerById",
      partnerId,
    });

    const partner = await GetPartnerByIdUseCase(partnerId);

    logger.info({ message: "✅ Partner found", partnerId, ip });

    return NextResponse.json({
      message: "Successfully retrieved partner",
      partner: formatPartnerData([partner]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve partner");
  }
}

export async function createPartner(request) {
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

    logger.info({ message: "📝 Parsing create partner form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const partner = await CreatePartnerUseCase(formData);

    logger.info({
      action: "createPartner",
      message: `✅ Partner '${partner.partnerName}' created`,
      createdBy: partner.partnerCreateBy,
      ip,
      partner,
    });

    return NextResponse.json(
      { message: "Partner created successfully", partner },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createPartner",
      message: "🔥 Failed to create partner",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create partner");
  }
}

export async function updatePartner(request, partnerId) {
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

    logger.info({ message: "📝 Parsing update partner form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const partner = await UpdatePartnerUseCase({ ...formData, partnerId });

    logger.info({
      action: "updatePartner",
      message: `✅ Partner ID ${partnerId} updated`,
      updatedBy: partner.partnerUpdateBy,
      ip,
      partner,
    });

    return NextResponse.json(
      { message: "Partner updated successfully", partner },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updatePartner",
      message: "🔥 Failed to update partner",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update partner");
  }
}
