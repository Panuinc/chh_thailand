import { NextResponse } from "next/server";
import { CreateDepartmentUseCase } from "../useCases/createDepartment.usecase";
import { UpdateDepartmentUseCase } from "../useCases/updateDepartment.usecase";
import { GetAllDepartmentUseCase } from "../useCases/getAllDepartment.usecase";
import { GetDepartmentByIdUseCase } from "../useCases/getDepartmentById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatDepartmentData } from "../schemas/department.schema";
import logger from "@/lib/logger";

export async function getAllDepartment(request) {
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
      message: "📥 Fetching all departments",
      action: "getAllDepartment",
      page,
      limit,
    });

    const { departments, total } = await GetAllDepartmentUseCase(page, limit);

    logger.info({
      message: "✅ Departments retrieved",
      total,
      count: departments.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved departments",
      total,
      page,
      limit,
      department: formatDepartmentData(departments),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve departments");
  }
}

export async function getDepartmentById(request, departmentId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching department by ID",
      action: "getDepartmentById",
      departmentId,
    });

    const department = await GetDepartmentByIdUseCase(departmentId);

    logger.info({ message: "✅ Department found", departmentId, ip });

    return NextResponse.json({
      message: "Successfully retrieved department",
      department: formatDepartmentData([department]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve department");
  }
}

export async function createDepartment(request) {
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

    logger.info({ message: "📝 Parsing create department form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const department = await CreateDepartmentUseCase(formData);

    logger.info({
      action: "createDepartment",
      message: `✅ Department '${department.departmentName}' created`,
      createdBy: department.departmentCreateBy,
      ip,
      department,
    });

    return NextResponse.json(
      { message: "Department created successfully", department },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createDepartment",
      message: "🔥 Failed to create department",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create department");
  }
}

export async function updateDepartment(request, departmentId) {
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

    logger.info({ message: "📝 Parsing update department form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const department = await UpdateDepartmentUseCase({ ...formData, departmentId });

    logger.info({
      action: "updateDepartment",
      message: `✅ Department ID ${departmentId} updated`,
      updatedBy: department.departmentUpdateBy,
      ip,
      department,
    });

    return NextResponse.json(
      { message: "Department updated successfully", department },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateDepartment",
      message: "🔥 Failed to update department",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update department");
  }
}
