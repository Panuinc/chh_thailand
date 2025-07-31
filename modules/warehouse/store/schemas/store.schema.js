import { z } from "zod";
import {
  preprocessString,
  preprocessInt,
  preprocessFloat,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

const enableStateEnum = ["Enable", "Disable"];
const binStatusEnum = ["Empty", "Partial", "Full", "Reserved"];

const binSchema = z.object({
  binCode: preprocessString("Please provide bin code"),
  binDescription: z.string().optional(),
  binRow: preprocessString("Please provide bin row"),
  binType: preprocessString("Please provide bin type"),
  binUsage: preprocessString("Please provide bin usage"),
  binCapacity: preprocessInt("Please provide bin capacity"),
  binRfidTagId: preprocessString("Please provide RFID tag"),
  binStatus: preprocessEnum(binStatusEnum, "Invalid bin status"),
  binFillRate: preprocessFloat("Please provide fill rate"),
  binPosX: preprocessFloat("Please provide X position"),
  binPosY: preprocessFloat("Please provide Y position"),
  binPosZ: preprocessFloat("Please provide Z position"),
});

const levelSchema = z.object({
  levelCode: preprocessString("Please provide level code"),
  levelName: preprocessString("Please provide level name"),
  levelDescription: z.string().optional(),
  levelBins: z.array(binSchema),
});

const rackSchema = z.object({
  rackCode: preprocessString("Please provide rack code"),
  rackName: preprocessString("Please provide rack name"),
  rackDescription: z.string().optional(),
  rackLevels: z.array(levelSchema),
});

const aisleSchema = z.object({
  aisleCode: preprocessString("Please provide aisle code"),
  aisleName: preprocessString("Please provide aisle name"),
  aisleDescription: z.string().optional(),
  aisleRacks: z.array(rackSchema),
});

const zoneSchema = z.object({
  zoneCode: preprocessString("Please provide zone code"),
  zoneName: preprocessString("Please provide zone name"),
  zoneDescription: z.string().optional(),
  zoneStatus: preprocessEnum(enableStateEnum, "Invalid zone status"),
  zoneAisles: z.array(aisleSchema),
});

export const storePostSchema = z.object({
  storeCode: preprocessString("Please provide store code"),
  storeName: preprocessString("Please provide store name"),
  storeLocation: preprocessString("Please provide store location"),
  storeDescription: preprocessString("Please provide store description"),
  storeStatus: preprocessEnum(enableStateEnum, "Invalid store status"),
  storeCreateBy: preprocessInt("Please provide store creator"),
  zones: z.array(zoneSchema).optional(),
});

export const storePutSchema = z.object({
  storeId: preprocessInt("Please provide store ID"),
  storeCode: preprocessString("Please provide store code"),
  storeName: preprocessString("Please provide store name"),
  storeLocation: preprocessString("Please provide store location"),
  storeDescription: preprocessString("Please provide store description"),
  storeStatus: preprocessEnum(enableStateEnum, "Invalid store status"),
  storeUpdateBy: preprocessInt("Please provide store updater"),
  zones: z.array(zoneSchema).optional(),
});

export const formatStoreData = (stores) =>
  formatData(stores, [], ["storeCreateAt", "storeUpdateAt"]);
