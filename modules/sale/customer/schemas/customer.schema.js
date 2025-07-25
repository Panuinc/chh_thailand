import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

const customerLeaderSchema = z.object({
  customerLeaderId: z.coerce.number().optional(),
  customerLeaderName: preprocessString("Please provide leader name"),
  customerLeaderEmail: preprocessString("Please provide leader email"),
  customerLeaderPhone: preprocessString("Please provide leader phone"),
  customerLeaderIsDecisionMaker: z.coerce.boolean().optional(),
});

export const customerPostSchema = z.object({
  customerTax: preprocessString("Please provide customer tax"),
  customerName: preprocessString("Please provide the customer name"),
  customerBranch: preprocessString("Please provide the customer branch"),
  customerAddress: preprocessString("Please provide customer address"),
  customerPhone: preprocessString("Please provide customer phone"),
  customerType: preprocessEnum(
    [
      "Owner",
      "CM",
      "MainConstruction",
      "DesignerArchitect",
      "EndUser",
      "Dealer",
    ],
    "Invalid customer type"
  ),
  customerCreateBy: preprocessInt("Please provide the creator's user ID"),
  customerLeaders: z.array(customerLeaderSchema).optional(),
});

export const customerPutSchema = z.object({
  customerId: preprocessInt("Please provide the customer ID to update"),
  customerTax: preprocessString("Please provide customer tax"),
  customerName: preprocessString("Please provide the customer name"),
  customerBranch: preprocessString("Please provide the customer branch"),
  customerAddress: preprocessString("Please provide customer address"),
  customerPhone: preprocessString("Please provide customer phone"),
  customerType: preprocessEnum(
    [
      "Owner",
      "CM",
      "MainConstruction",
      "DesignerArchitect",
      "EndUser",
      "Dealer",
    ],
    "Invalid customer type"
  ),
  customerStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  customerUpdateBy: preprocessInt("Please provide the updater's user ID"),
  customerLeaders: z.array(customerLeaderSchema).optional(),
});

export const formatCustomerData = (customers) =>
  formatData(customers, [], ["customerCreateAt", "customerUpdateAt"]);
