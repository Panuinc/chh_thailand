import {
  getAllDivision,
  createDivision,
} from "@/modules/human/division/controllers/division.controller";

export async function GET(request) {
  return getAllDivision(request);
}

export async function POST(request) {
  return createDivision(request);
}

export const dynamic = "force-dynamic";
