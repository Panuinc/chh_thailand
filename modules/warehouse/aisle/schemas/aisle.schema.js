import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const aislePostSchema = z.object({
  aisleStoreId: preprocessInt("Please select store"),
  aisleZoneId: preprocessInt("Please select zone"),
  aisleCode: preprocessString("Please provide the aisle code"),
  aisleName: preprocessString("Please provide the aisle name"),
  aisleDescription: preprocessString("Please provide the aisle description"),
  aisleCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const aislePutSchema = z.object({
  aisleId: preprocessInt("Please provide the aisle ID to update"),
  aisleCode: preprocessString("Please provide the aisle code"),
  aisleName: preprocessString("Please provide the aisle name"),
  aisleDescription: preprocessString("Please provide the aisle description"),
  aisleStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  aisleUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatAisleData = (aisles) =>
  formatData(aisles, [], ["aisleCreateAt", "aisleUpdateAt"]);
