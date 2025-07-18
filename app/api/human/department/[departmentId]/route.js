import { getDepartmentById, updateDepartment } from "@/modules/human/department/controllers/department.controller";

export async function GET(request, context) {
  const { departmentId } = await context.params;
  return getDepartmentById(request, departmentId);
}

export async function PUT(request, context) {
  const { departmentId } = await context.params;
  return updateDepartment(request, departmentId);
}

export const dynamic = "force-dynamic";
