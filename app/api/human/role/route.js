import {
  getAllRole,
  createRole,
} from "@/modules/human/role/controllers/role.controller";

export async function GET(request) {
  return getAllRole(request);
}

export async function POST(request) {
  return createRole(request);
}

export const dynamic = "force-dynamic";
