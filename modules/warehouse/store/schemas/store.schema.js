import { z } from "zod";
import {
  preprocessInt,
  preprocessDouble,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

const binSchema = z.object({
  binCode: preprocessString("Bin code"),
  binRow: preprocessString("Bin row"),
  binType: preprocessString("Bin type"),
  binUsage: preprocessString("Bin usage"),
  binCapacity: preprocessInt("Bin capacity"),
  binPosX: z.preprocessDouble(),
  binPosY: z.preprocessDouble(),
  binPosZ: z.preprocessDouble(),
});

const levelSchema = z.object({
  levelCode: preprocessString("Level code"),
  levelName: preprocessString("Level name"),
  bins: z.array(binSchema),
});

const rackSchema = z.object({
  rackCode: preprocessString("Rack code"),
  rackName: preprocessString("Rack name"),
  levels: z.array(levelSchema),
});

const aisleSchema = z.object({
  aisleCode: preprocessString("Aisle code"),
  aisleName: preprocessString("Aisle name"),
  racks: z.array(rackSchema),
});

const zoneSchema = z.object({
  zoneCode: preprocessString("Zone code"),
  zoneName: preprocessString("Zone name"),
  zoneDescription: z.string().optional(),
  aisles: z.array(aisleSchema),
});

export const storePostSchema = z.object({
  storeCode: preprocessString("Store code"),
  storeName: preprocessString("Store name"),
  storeLocation: preprocessString("Store location"),
  storeDescription: z.string().optional(),
  storeCreateBy: preprocessInt("Creator id"),
  zones: z.array(zoneSchema).default([]),
});

export const storePutSchema = z.object({
  storeId: preprocessInt("Store id"),
  storeCode: preprocessString("Store code"),
  storeName: preprocessString("Store name"),
  storeLocation: preprocessString("Store location"),
  storeDescription: z.string().optional(),
  storeStatus: preprocessEnum(["Enable", "Disable"], "Status"),
  storeUpdateBy: preprocessInt("Updater id"),
  zones: z.array(zoneSchema).default([]),
});

export const formatStoreData = (stores) =>
  formatData(stores, [], ["storeCreateAt", "storeUpdateAt"]);
