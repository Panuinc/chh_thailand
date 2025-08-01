import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const levelPostSchema = z.object({
  levelStoreId: preprocessInt("Please select store"),
  levelZoneId: preprocessInt("Please select zone"),
  levelAisleId: preprocessInt("Please select aisle"),
  levelRackId: preprocessInt("Please select rack"),
  levelCode: preprocessString("Please provide the level code"),
  levelName: preprocessString("Please provide the level name"),
  levelDescription: preprocessString("Please provide the level description"),
  levelCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const levelPutSchema = z.object({
  levelId: preprocessInt("Please provide the level ID to update"),
  levelCode: preprocessString("Please provide the level code"),
  levelName: preprocessString("Please provide the level name"),
  levelDescription: preprocessString("Please provide the level description"),
  levelStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  levelUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatLevelData = (levels) =>
  formatData(levels, [], ["levelCreateAt", "levelUpdateAt"]);
