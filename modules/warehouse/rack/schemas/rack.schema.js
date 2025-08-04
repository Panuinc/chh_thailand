import { z } from "zod";
import {
  preprocessInt,
  preprocessDouble,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const rackPostSchema = z.object({
  rackStoreId: preprocessInt("Please select store"),
  rackZoneId: preprocessInt("Please select zone"),
  rackAisleId: preprocessInt("Please select aisle"),
  rackCode: preprocessString("Please provide the rack code"),
  rackName: preprocessString("Please provide the rack name"),
  rackDescription: preprocessString("Please provide the rack description"),
  rackPosX: preprocessDouble("Please provide rack X position"),
  rackPosY: preprocessDouble("Please provide rack Y position"),
  rackPosZ: preprocessDouble("Please provide rack XZ position"),
  rackCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const rackPutSchema = z.object({
  rackId: preprocessInt("Please provide the rack ID to update"),
  rackCode: preprocessString("Please provide the rack code"),
  rackName: preprocessString("Please provide the rack name"),
  rackDescription: preprocessString("Please provide the rack description"),
  rackPosX: preprocessDouble("Please provide rack X position"),
  rackPosY: preprocessDouble("Please provide rack Y position"),
  rackPosZ: preprocessDouble("Please provide rack XZ position"),
  rackStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  rackUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatRackData = (racks) =>
  formatData(racks, [], ["rackCreateAt", "rackUpdateAt"]);
