import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const customerPostSchema = z.object({
  customerName: preprocessString("Please provide the customer name"),
  customerCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const customerPutSchema = z.object({
  customerId: preprocessInt("Please provide the customer ID to update"),
  customerName: preprocessString("Please provide the customer name"),
  customerStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  customerUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatCustomerData = (customers) =>
  formatData(customers, [], ["customerCreateAt", "customerUpdateAt"]);
