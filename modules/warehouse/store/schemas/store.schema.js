import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

const storeLeaderSchema = z.object({
  storeLeaderId: z.coerce.number().optional(),
  storeLeaderName: preprocessString("Please provide leader name"),
  storeLeaderEmail: preprocessString("Please provide leader email"),
  storeLeaderPhone: preprocessString("Please provide leader phone"),
  storeLeaderIsDecisionMaker: z.coerce.boolean().optional(),
});

export const storePostSchema = z.object({
  storeTax: preprocessString("Please provide store tax"),
  storeName: preprocessString("Please provide the store name"),
  storeBranch: preprocessString("Please provide the store branch"),
  storeAddress: preprocessString("Please provide store address"),
  storePhone: preprocessString("Please provide store phone"),
  storeType: preprocessEnum(
    [
      "Owner",
      "CM",
      "MainConstruction",
      "DesignerArchitect",
      "EndUser",
      "Dealer",
    ],
    "Invalid store type"
  ),
  storeCreateBy: preprocessInt("Please provide the creator's user ID"),
  storeLeaders: z.array(storeLeaderSchema).optional(),
});

export const storePutSchema = z.object({
  storeId: preprocessInt("Please provide the store ID to update"),
  storeTax: preprocessString("Please provide store tax"),
  storeName: preprocessString("Please provide the store name"),
  storeBranch: preprocessString("Please provide the store branch"),
  storeAddress: preprocessString("Please provide store address"),
  storePhone: preprocessString("Please provide store phone"),
  storeType: preprocessEnum(
    [
      "Owner",
      "CM",
      "MainConstruction",
      "DesignerArchitect",
      "EndUser",
      "Dealer",
    ],
    "Invalid store type"
  ),
  storeStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  storeUpdateBy: preprocessInt("Please provide the updater's user ID"),
  storeLeaders: z.array(storeLeaderSchema).optional(),
});

export const formatStoreData = (stores) =>
  formatData(stores, [], ["storeCreateAt", "storeUpdateAt"]);
