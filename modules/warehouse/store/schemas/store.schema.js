import { z } from "zod";
import {
  preprocessInt,
  preprocessDouble,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const zoneSchema = z.object({
  zoneId: preprocessInt("Please provide the zone ID").optional(),
  zoneCode: preprocessString("Please provide the zone code"),
  zoneName: preprocessString("Please provide the zone name"),
  zoneDescription: preprocessString("Please provide the zone description"),
  zonePosX: preprocessDouble("Please provide the zone position X"),
  zonePosY: preprocessDouble("Please provide the zone position Y"),
  zoneStatus: preprocessEnum(["Enable", "Disable"], "Please provide zone status"),
});

export const storePostSchema = z.object({
  storeCode: preprocessString("Please provide the store code"),
  storeName: preprocessString("Please provide the store name"),
  storeDescription: preprocessString("Please provide the store description"),
  storeCreateBy: preprocessInt("Please provide the creator's user ID"),
  storeZones: z.array(zoneSchema).optional(),
});

export const storePutSchema = z.object({
  storeId: preprocessInt("Please provide the store ID to update"),
  storeCode: preprocessString("Please provide the store code"),
  storeName: preprocessString("Please provide the store name"),
  storeDescription: preprocessString("Please provide the store description"),
  storeStatus: preprocessEnum(["Enable", "Disable"], "Please provide store status"),
  storeUpdateBy: preprocessInt("Please provide the updater's user ID"),
  storeZones: z.array(zoneSchema).optional(),
});

export const formatStoreData = (stores) =>
  formatData(stores, [], ["storeCreateAt", "storeUpdateAt"]);

// export const binSchema = z.object({
//   binId: preprocessInt("Please provide the bin ID").optional(),
//   binCode: preprocessString("Please provide the bin code"),
//   binName: preprocessString("Please provide the bin name"),
//   binDescription: preprocessString("Please provide the bin description"),
//   binRow: preprocessString("Please provide the bin row"),
//   binType: preprocessString("Please provide the bin type"),
//   binUsage: preprocessString("Please provide the bin usage"),
//   binCapacity: preprocessInt("Please provide the bin capacity"),
//   binRfidTagId: preprocessString("Please provide the RFID tag ID"),
//   binOccupancy: preprocessEnum(["Empty", "Partial", "Full", "Reserved"], "Please provide bin occupancy status"),
//   binFillRate: preprocessDouble("Please provide the bin fill rate"),
//   binPosX: preprocessDouble("Please provide the bin position X"),
//   binPosY: preprocessDouble("Please provide the bin position Y"),
//   binWidth: preprocessDouble("Please provide the bin width"),
//   binHeight: preprocessDouble("Please provide the bin height"),
//   binDepth: preprocessDouble("Please provide the bin depth"),
//   binStatus: preprocessEnum(["Enable", "Disable"], "Please provide bin status"),
// });

// export const levelSchema = z.object({
//   levelId: preprocessInt("Please provide the level ID").optional(),
//   levelCode: preprocessString("Please provide the level code"),
//   levelName: preprocessString("Please provide the level name"),
//   levelDescription: preprocessString("Please provide the level description"),
//   levelStatus: preprocessEnum(["Enable", "Disable"], "Please provide level status"),
//   levelBins: z.array(binSchema).optional(),
// });

// export const rackSchema = z.object({
//   rackId: preprocessInt("Please provide the rack ID").optional(),
//   rackCode: preprocessString("Please provide the rack code"),
//   rackName: preprocessString("Please provide the rack name"),
//   rackDescription: preprocessString("Please provide the rack description"),
//   rackPosX: preprocessDouble("Please provide the rack position X"),
//   rackPosY: preprocessDouble("Please provide the rack position Y"),
//   rackStatus: preprocessEnum(["Enable", "Disable"], "Please provide rack status"),
//   rackLevels: z.array(levelSchema).optional(),
// });

// export const aisleSchema = z.object({
//   aisleId: preprocessInt("Please provide the aisle ID").optional(),
//   aisleCode: preprocessString("Please provide the aisle code"),
//   aisleName: preprocessString("Please provide the aisle name"),
//   aisleDescription: preprocessString("Please provide the aisle description"),
//   aislePosX: preprocessDouble("Please provide the aisle position X"),
//   aislePosY: preprocessDouble("Please provide the aisle position Y"),
//   aisleStatus: preprocessEnum(["Enable", "Disable"], "Please provide aisle status"),
//   aisleRacks: z.array(rackSchema).optional(),
// });

// export const zoneSchema = z.object({
//   zoneId: preprocessInt("Please provide the zone ID").optional(),
//   zoneCode: preprocessString("Please provide the zone code"),
//   zoneName: preprocessString("Please provide the zone name"),
//   zoneDescription: preprocessString("Please provide the zone description"),
//   zonePosX: preprocessDouble("Please provide the zone position X"),
//   zonePosY: preprocessDouble("Please provide the zone position Y"),
//   zoneStatus: preprocessEnum(["Enable", "Disable"], "Please provide zone status"),
//   zoneAisles: z.array(aisleSchema).optional(),
// });