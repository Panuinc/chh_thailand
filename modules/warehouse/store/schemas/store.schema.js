import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const storePostSchema = z.object({
  storeName: preprocessString("Please provide the store name"),
  storeCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const storePutSchema = z.object({
  storeId: preprocessInt("Please provide the store ID to update"),
  storeName: preprocessString("Please provide the store name"),
  storeStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  storeUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatStoreData = (stores) =>
  formatData(stores, [], ["storeCreateAt", "storeUpdateAt"]);
