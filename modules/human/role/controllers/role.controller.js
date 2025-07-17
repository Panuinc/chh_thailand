import { NextResponse } from "next/server";
import { CreateRoleUseCase } from "../use-cases/createRole.usecase";
import { UpdateRoleUseCase } from "../use-cases/updateRole.usecase";
import { GetAllRoleUseCase } from "../use-cases/getAllRole.usecase";
import { GetRoleByIdUseCase } from "../use-cases/getRoleById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { formatRoleData } from "../schemas/role.schema";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";

export async function getAllRole(request) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "1000000", 10);

    const { roles, total } = await GetAllRoleUseCase(page, limit);

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
    const role = await GetRoleByIdUseCase(roleId);

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
    ip = await validateRequest(request);
    const formData = Object.fromEntries((await request.formData()).entries());
    const role = await CreateRoleUseCase(formData);

    return NextResponse.json(
      { message: "Role created successfully", role },
      { status: 201 }
    );
  } catch (error) {
    return handleErrors(error, ip, "❌ Failed to create role");
  }
}

export async function updateRole(request, roleId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    const formData = Object.fromEntries((await request.formData()).entries());
    const role = await UpdateRoleUseCase({ ...formData, roleId });

    return NextResponse.json(
      { message: "Role updated successfully", role },
      { status: 200 }
    );
  } catch (error) {
    return handleErrors(error, ip, "❌ Failed to update role");
  }
}
