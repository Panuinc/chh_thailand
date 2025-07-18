import { getDivisionById, updateDivision } from "@/modules/human/division/controllers/division.controller";

export async function GET(request, context) {
  const { divisionId } = await context.params;
  return getDivisionById(request, divisionId);
}

export async function PUT(request, context) {
  const { divisionId } = await context.params;
  return updateDivision(request, divisionId);
}

export const dynamic = "force-dynamic";
