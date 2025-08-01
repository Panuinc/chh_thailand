import {
  getAllAisle,
  createAisle,
} from "@/modules/warehouse/aisle/controllers/aisle.controller";

export async function GET(request) {
  return getAllAisle(request);
}

export async function POST(request) {
  return createAisle(request);
}

export const dynamic = "force-dynamic";
