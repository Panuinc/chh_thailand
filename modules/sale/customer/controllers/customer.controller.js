import { NextResponse } from "next/server";
import { CreateCustomerUseCase } from "../useCases/createCustomer.usecase";
import { UpdateCustomerUseCase } from "../useCases/updateCustomer.usecase";
import { GetAllCustomerUseCase } from "../useCases/getAllCustomer.usecase";
import { GetCustomerByIdUseCase } from "../useCases/getCustomerById.usecase";
import { validateRequest } from "@/lib/validateRequest";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { formatCustomerData } from "../schemas/customer.schema";
import logger from "@/lib/logger";

export async function getAllCustomer(request) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "1000000", 10);

    logger.info({
      message: "📥 Fetching all customers",
      action: "getAllCustomer",
      page,
      limit,
    });

    const { customers, total } = await GetAllCustomerUseCase(page, limit);

    logger.info({
      message: "✅ Customers retrieved",
      total,
      count: customers.length,
      page,
      ip,
    });

    return NextResponse.json({
      message: "Successfully retrieved customers",
      total,
      page,
      limit,
      customer: formatCustomerData(customers),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve customers");
  }
}

export async function getCustomerById(request, customerId) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({
      message: "🔍 Fetching customer by ID",
      action: "getCustomerById",
      customerId,
    });

    const customer = await GetCustomerByIdUseCase(customerId);

    logger.info({ message: "✅ Customer found", customerId, ip });

    return NextResponse.json({
      message: "Successfully retrieved customer",
      customer: formatCustomerData([customer]),
    });
  } catch (error) {
    return handleGetErrors(error, ip, "❌ Failed to retrieve customer");
  }
}

export async function createCustomer(request) {
  let ip = "";
  try {
    if (request.method !== "POST") {
      logger.warn({ message: "⚠️ Method not allowed", method: request.method });
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({ message: "📝 Parsing create customer form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const customer = await CreateCustomerUseCase(formData);

    logger.info({
      action: "createCustomer",
      message: `✅ Customer '${customer.customerName}' created`,
      createdBy: customer.customerCreateBy,
      ip,
      customer,
    });

    return NextResponse.json(
      { message: "Customer created successfully", customer },
      { status: 201 }
    );
  } catch (error) {
    logger.error({
      action: "createCustomer",
      message: "🔥 Failed to create customer",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to create customer");
  }
}

export async function updateCustomer(request, customerId) {
  let ip = "";
  try {
    if (request.method !== "PUT") {
      logger.warn({ message: "⚠️ Method not allowed", method: request.method });
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    ip = await validateRequest(request);
    logger.info({ message: "📡 Incoming request", ip });
    logger.info({ message: "✅ Secret token verified" });
    logger.info({ message: "✅ Rate limit OK", ip });

    logger.info({ message: "📝 Parsing update customer form" });
    const formData = Object.fromEntries((await request.formData()).entries());
    const customer = await UpdateCustomerUseCase({ ...formData, customerId });

    logger.info({
      action: "updateCustomer",
      message: `✅ Customer ID ${customerId} updated`,
      updatedBy: customer.customerUpdateBy,
      ip,
      customer,
    });

    return NextResponse.json(
      { message: "Customer updated successfully", customer },
      { status: 200 }
    );
  } catch (error) {
    logger.error({
      action: "updateCustomer",
      message: "🔥 Failed to update customer",
      error: error.message,
      details: error.details ?? null,
      ip,
    });

    return handleErrors(error, ip, "❌ Failed to update customer");
  }
}
