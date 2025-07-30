import { z } from "zod";
import {
  preprocessInt,
  preprocessDouble,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

const binSchema = z.object({
  binCode: preprocessString("Please provide the bin code"),
  binRow: preprocessString("Please provide the bin row"),
  binType: preprocessString("Please provide the bin type"),
  binUsage: preprocessString("Please provide the bin usage"),
  binCapacity: preprocessInt("Please provide the bin capacity"),
  binPosX: preprocessDouble("Please provide the bin X position"),
  binPosY: preprocessDouble("Please provide the bin Y position"),
  binPosZ: preprocessDouble("Please provide the bin Z position"),
});

const levelSchema = z.object({
  levelCode: preprocessString("Please provide the level code"),
  levelName: preprocessString("Please provide the level name"),
  bins: z.array(binSchema, {
    required_error: "Please provide bins for this level",
  }),
});

const rackSchema = z.object({
  rackCode: preprocessString("Please provide the rack code"),
  rackName: preprocessString("Please provide the rack name"),
  levels: z.array(levelSchema, {
    required_error: "Please provide levels for this rack",
  }),
});

const aisleSchema = z.object({
  aisleCode: preprocessString("Please provide the aisle code"),
  aisleName: preprocessString("Please provide the aisle name"),
  racks: z.array(rackSchema, {
    required_error: "Please provide racks for this aisle",
  }),
});

const zoneSchema = z.object({
  zoneCode: preprocessString("Please provide the zone code"),
  zoneName: preprocessString("Please provide the zone name"),
  zoneDescription: preprocessString("Please provide the zone description"),
  aisles: z.array(aisleSchema, {
    required_error: "Please provide aisles for this zone",
  }),
});

export const storePostSchema = z.object({
  storeCode: preprocessString("Please provide the store code"),
  storeName: preprocessString("Please provide the store name"),
  storeLocation: preprocessString("Please provide the store location"),
  storeDescription: preprocessString("Please provide the store description"),
  storeCreateBy: preprocessInt("Please provide the creator's user ID"),
  zones: z.array(zoneSchema, {
    required_error: "Please provide zones for this store",
  }),
});

export const storePutSchema = z.object({
  storeId: preprocessInt("Please provide the store ID to update"),
  storeCode: preprocessString("Please provide the store code"),
  storeName: preprocessString("Please provide the store name"),
  storeLocation: preprocessString("Please provide the store location"),
  storeDescription: preprocessString("Please provide the store description"),
  storeStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  storeUpdateBy: preprocessInt("Please provide the updater's user ID"),
  zones: z.array(zoneSchema, {
    required_error: "Please provide zones for this store",
  }),
});

export const formatStoreData = (stores) =>
  formatData(stores, [], ["storeCreateAt", "storeUpdateAt"]);
