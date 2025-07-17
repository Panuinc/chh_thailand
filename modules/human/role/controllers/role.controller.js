import { NextResponse } from "next/server";
import { CreateRoleUseCase } from "../use-cases/createRole.usecase";
import { UpdateRoleUseCase } from "../use-cases/updateRole.usecase";
import { GetAllRoleUseCase } from "../use-cases/getAllRole.usecase";
import { GetRoleByIdUseCase } from "../use-cases/getRoleById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatRoleData } from "../schemas/role.schema";
import logger from "@/lib/logger";

export async function getAllRole(request) {
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
      message: "📥 Fetching all roles",
      action: "getAllRole",
      page,
      limit,
    });

    const { roles, total } = await GetAllRoleUseCase(page, limit);

    logger.info({
      message: "✅ Roles retrieved",
      total,
      count: roles.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved roles",
      total,
      page,
      limit,
      role: formatRoleData(roles),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve roles");
  }
}

export async function getRoleById(request, roleId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching role by ID",
      action: "getRoleById",
      roleId,
    });

    const role = await GetRoleByIdUseCase(roleId);

    logger.info({ message: "✅ Role found", roleId, ip });

    return NextResponse.json({
      message: "Successfully retrieved role",
      role: formatRoleData([role]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve role");
  }
}

export async function createRole(request) {
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

    logger.info({ message: "📝 Parsing create role form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const role = await CreateRoleUseCase(formData);

    logger.info({
      action: "createRole",
      message: `✅ Role '${role.roleName}' created`,
      createdBy: role.roleCreateBy,
      ip,
      role,
    });

    return NextResponse.json(
      { message: "Role created successfully", role },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createRole",
      message: "🔥 Failed to create role",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create role");
  }
}

export async function updateRole(request, roleId) {
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

    logger.info({ message: "📝 Parsing update role form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const role = await UpdateRoleUseCase({ ...formData, roleId });

    logger.info({
      action: "updateRole",
      message: `✅ Role ID ${roleId} updated`,
      updatedBy: role.roleUpdateBy,
      ip,
      role,
    });

    return NextResponse.json(
      { message: "Role updated successfully", role },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateRole",
      message: "🔥 Failed to update role",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update role");
  }
}
