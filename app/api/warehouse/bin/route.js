import {
  getAllBin,
  createBin,
} from "@/modules/warehouse/bin/controllers/bin.controller";

export async function GET(request) {
  return getAllBin(request);
}

export async function POST(request) {
  return createBin(request);
}

export const dynamic = "force-dynamic";
