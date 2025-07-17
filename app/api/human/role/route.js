import { getAllRole, createRole } from "@/app/api/human/role/roleController";

export async function GET(request) {
  return getAllRole(request);
}

export async function POST(request) {
  return createRole(request);
}

export const dynamic = "force-dynamic";
