import { z } from "zod";
import {
  preprocessInt,
  preprocessDouble,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const zonePostSchema = z.object({
  zoneStoreId: preprocessInt("Please select store"),
  zoneCode: preprocessString("Please provide the zone code"),
  zoneName: preprocessString("Please provide the zone name"),
  zoneDescription: preprocessString("Please provide the zone description"),
  zonePosX: preprocessDouble("Please provide zone X position"),
  zonePosY: preprocessDouble("Please provide zone Y position"),
  zonePosZ: preprocessDouble("Please provide zone Z position"),
  zoneCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const zonePutSchema = z.object({
  zoneId: preprocessInt("Please provide the zone ID to update"),
  zoneCode: preprocessString("Please provide the zone code"),
  zoneName: preprocessString("Please provide the zone name"),
  zoneDescription: preprocessString("Please provide the zone description"),
  zonePosX: preprocessDouble("Please provide zone X position"),
  zonePosY: preprocessDouble("Please provide zone Y position"),
  zonePosZ: preprocessDouble("Please provide zone Z position"),
  zoneStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  zoneUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatZoneData = (zones) =>
  formatData(zones, [], ["zoneCreateAt", "zoneUpdateAt"]);
