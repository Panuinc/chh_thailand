import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessDouble,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const binPostSchema = z.object({
  binStoreId: preprocessInt("Please select store"),
  binZoneId: preprocessInt("Please select zone"),
  binAisleId: preprocessInt("Please select aisle"),
  binRackId: preprocessInt("Please select rack"),
  binLevelId: preprocessInt("Please select level"),
  binCode: preprocessString("Please provide the bin code"),
  binName: preprocessString("Please provide the bin name"),
  binDescription: preprocessString("Please provide the bin description"),
  binRow: preprocessString("Please provide the bin row"),
  binType: preprocessString("Please provide the bin type"),
  binUsage: preprocessString("Please provide the bin usage"),
  binCapacity: preprocessInt("Please provide the bin capacity"),
  binRfidTagId: preprocessString("Please provide the RFID tag ID"),
  binOccupancy: preprocessEnum(
    ["Empty", "Partial", "Full", "Reserved"],
    "Please select bin occupancy"
  ),
  binFillRate: preprocessDouble("Please provide the fill rate"),
  binPosX: preprocessDouble("Please provide bin X position"),
  binPosY: preprocessDouble("Please provide bin Y position"),
  binPosZ: preprocessDouble("Please provide bin Z position"),
  binRotationX: preprocessDouble("Please provide bin rotation X"),
  binRotationY: preprocessDouble("Please provide bin rotation Y"),
  binRotationZ: preprocessDouble("Please provide bin rotation Z"),
  binWidth: preprocessDouble("Please provide bin width"),
  binHeight: preprocessDouble("Please provide bin height"),
  binDepth: preprocessDouble("Please provide bin depth"),
  binCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const binPutSchema = z.object({
  binId: preprocessInt("Please provide the bin ID to update"),
  binCode: preprocessString("Please provide the bin code"),
  binName: preprocessString("Please provide the bin name"),
  binDescription: preprocessString("Please provide the bin description"),
  binRow: preprocessString("Please provide the bin row"),
  binType: preprocessString("Please provide the bin type"),
  binUsage: preprocessString("Please provide the bin usage"),
  binCapacity: preprocessInt("Please provide the bin capacity"),
  binRfidTagId: preprocessString("Please provide the RFID tag ID"),
  binOccupancy: preprocessEnum(
    ["Empty", "Partial", "Full", "Reserved"],
    "Please select bin occupancy"
  ),
  binFillRate: preprocessDouble("Please provide the fill rate"),
  binPosX: preprocessDouble("Please provide bin X position"),
  binPosY: preprocessDouble("Please provide bin Y position"),
  binPosZ: preprocessDouble("Please provide bin Z position"),
  binRotationX: preprocessDouble("Please provide bin rotation X"),
  binRotationY: preprocessDouble("Please provide bin rotation Y"),
  binRotationZ: preprocessDouble("Please provide bin rotation Z"),
  binWidth: preprocessDouble("Please provide bin width"),
  binHeight: preprocessDouble("Please provide bin height"),
  binDepth: preprocessDouble("Please provide bin depth"),
  binStatus: preprocessEnum(["Enable", "Disable"], "Please select status"),
  binUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatBinData = (bins) =>
  formatData(bins, [], ["binCreateAt", "binUpdateAt"]);
