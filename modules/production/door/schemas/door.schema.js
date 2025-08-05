import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const doorPostSchema = z.object({
  doorProjectName: preprocessString("Please provide the door name"),
  doorCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const doorPutSchema = z.object({
  doorId: preprocessInt("Please provide the door ID to update"),
  doorProjectName: preprocessString("Please provide the door name"),
  doorStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  doorUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatDoorData = (doors) =>
  formatData(doors, [], ["doorCreateAt", "doorUpdateAt"]);
