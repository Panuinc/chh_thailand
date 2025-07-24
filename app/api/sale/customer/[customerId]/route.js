import { getCustomerById, updateCustomer } from "@/modules/sale/customer/controllers/customer.controller";

export async function GET(request, context) {
  const { customerId } = await context.params;
  return getCustomerById(request, customerId);
}

export async function PUT(request, context) {
  const { customerId } = await context.params;
  return updateCustomer(request, customerId);
}

export const dynamic = "force-dynamic";
