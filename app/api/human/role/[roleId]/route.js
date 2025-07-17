import { getRoleById, updateRole } from "@/app/api/human/role/roleController";

export async function GET(request, context) {
  const { roleId } = await context.params;
  return getRoleById(request, roleId);
}

export async function PUT(request, context) {
  const { roleId } = await context.params;
  return updateRole(request, roleId);
}

export const dynamic = "force-dynamic";
