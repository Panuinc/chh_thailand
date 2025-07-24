import {
  getAllCustomer,
  createCustomer,
} from "@/modules/sale/customer/controllers/customer.controller";

export async function GET(request) {
  return getAllCustomer(request);
}

export async function POST(request) {
  return createCustomer(request);
}

export const dynamic = "force-dynamic";
