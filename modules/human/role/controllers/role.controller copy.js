import { NextResponse } from "next/server";
import { RoleService } from "../services/role.service";
import {
  rolePostSchema,
  rolePutSchema,
  formatRoleData,
} from "../schemas/role.schema";
import logger from "@/lib/logger";
import { validateRequest } from "@/lib/validateRequest";
import { getLocalNow } from "@/lib/getLocalNow";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { Prisma } from "@prisma/client";

async function parseFormData(request, schema, extraData = {}) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const merged = { ...raw, ...extraData };
  const parsed = schema.safeParse(merged);

  if (!parsed.success) {
    const details = parsed.error.flatten().fieldErrors;
    logger.debug({
      message: "🛑 Validation failed",
      details,
    });
    throw { status: 422, message: "Invalid input", details };
  }

  return parsed.data;
}

export async function getAllRole(request) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "1000000", 10);
    const skip = (page - 1) * limit;

    logger.info({
      message: "📥 Fetching all roles",
      action: "getAllRolePaginated",
      skip,
      take: limit,
    });

    const roles = await RoleService.getAllPaginated(skip, limit);

    logger.info({
      message: "🔢 Counting total roles",
      action: "countAllRoles",
    });

    const total = await RoleService.countAll();

    if (!roles?.length) {
      logger.info({ message: "⚠️ No roles found", page, limit, ip });
      return NextResponse.json({
        message: "No roles found",
        total: 0,
        page,
        limit,
        role: [],
      });
    }

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

    const parsedId = parseInt(roleId, 10);
    if (!Number.isInteger(parsedId)) {
      logger.warn({ message: "⚠️ Invalid role ID", roleId, ip });
      return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
    }

    logger.info({
      message: "🔍 Fetching role by ID",
      action: "getRoleById",
      roleId: parsedId,
    });

    const role = await RoleService.getById(parsedId);
    if (!role) {
      logger.warn({ message: "❌ Role not found", roleId: parsedId, ip });
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    logger.info({ message: "✅ Role found", roleId: parsedId, ip });

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
    const parsed = await parseFormData(request, rolePostSchema);

    const normalizedName = parsed.roleName.trim().toLowerCase();
    logger.info({
      message: "🔍 Checking duplicate role",
      roleName: normalizedName,
    });

    const exists = await RoleService.getByName(normalizedName);
    if (exists) {
      logger.warn({
        message: "❌ Duplicate role",
        roleName: normalizedName,
        ip,
      });
      return NextResponse.json(
        { error: `Role '${normalizedName}' already exists` },
        { status: 409 }
      );
    }

    const newRole = await RoleService.create({
      ...parsed,
      roleName: normalizedName,
      roleCreateAt: getLocalNow(),
    });

    logger.info({
      action: "createRole",
      message: `✅ Role '${normalizedName}' created`,
      createdBy: parsed.roleCreateBy,
      ip,
      role: newRole,
    });

    return NextResponse.json(
      { message: "Role created successfully", role: newRole },
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

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Duplicate role name" },
        { status: 409 }
      );
    }

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

    const parsedId = parseInt(roleId, 10);
    if (!Number.isInteger(parsedId)) {
      logger.warn({ message: "⚠️ Invalid role ID", roleId, ip });
      return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
    }

    logger.info({ message: "🔍 Fetching role for update", roleId: parsedId });

    const existing = await RoleService.getById(parsedId);
    if (!existing) {
      logger.warn({ message: "❌ Role not found", roleId: parsedId, ip });
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    logger.info({ message: "📝 Parsing update role form" });
    const parsed = await parseFormData(request, rolePutSchema, {
      roleId: parsedId,
    });

    const updated = await RoleService.update(parsedId, {
      ...parsed,
      roleName: parsed.roleName.trim().toLowerCase(),
      roleUpdateAt: getLocalNow(),
    });

    logger.info({
      action: "updateRole",
      message: `✅ Role ID ${parsedId} updated`,
      updatedBy: parsed.roleUpdateBy,
      ip,
      role: updated,
    });

    return NextResponse.json(
      { message: "Role updated successfully", role: updated },
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

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Duplicate role name" },
        { status: 409 }
      );
    }

    return handleErrors(error, ip, "❌ Failed to update role");
  }
}
