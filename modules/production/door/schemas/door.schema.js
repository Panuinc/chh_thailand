import { z } from "zod";
import {
  preprocessInt,
  preprocessDouble,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

const doorTypeEnum = ["SolidShaft", "HollowCore"];
const doorSurfaceMaterialEnum = [
  "Hardboard",
  "Plywood",
  "Mdf",
  "Metal",
  "Wpc",
  "Upvc",
  "Mgo",
];
const doorCoreMaterialEnum = ["ParticleBoard", "LumberCore", "MineralCore"];
const doorSurfaceTypeEnum = ["Paint", "Hpl", "Melamine", "Plain", "Other"];
const doorHingesSideEnum = ["Left", "Right"];
const doorLocksSideEnum = ["Left", "Right"];
const doorLocksTypeEnum = ["Mortise", "Cylindrical", "Deadbolt"];
const doorGlassPanelsTypeEnum = ["ClearGlass", "FrostedGlass", "TintedGlass"];
const yesOrNoEnum = ["Yes", "No"];
const doorSkeletonMaterialTypeEnum = [
  "RubberWood",
  "LaminatedVeneerLumber",
  "WoodPlasticComposite",
];
const doorSkeletonLockSetSideEnum = ["Right", "Left", "BothSides"];

const grooveLineSchema = z.object({
  DoorGrooveLinesId: z.coerce.number().optional(),
  DoorGrooveLinesDistanceFromTop: preprocessDouble("Please provide distance from top"),
  DoorGrooveLinesDistanceFromLeft: preprocessDouble("Please provide distance from left"),
  DoorGrooveLinesWidth: preprocessDouble("Please provide width"),
  DoorGrooveLinesLength: preprocessDouble("Please provide length"),
});

const hingeSchema = z.object({
  doorHingesId: z.coerce.number().optional(),
  doorHingesDistanceFromTop: preprocessDouble("Please provide hinge distance from top"),
  doorHingesSide: preprocessEnum(doorHingesSideEnum, "Please provide hinge side"),
});

const lockSchema = z.object({
  doorLocksId: z.coerce.number().optional(),
  doorLocksDistanceFromTop: preprocessDouble("Please provide lock distance from top"),
  doorLocksDistanceFromEdge: preprocessDouble("Please provide lock distance from edge"),
  doorLocksSide: preprocessEnum(doorLocksSideEnum, "Please provide lock side"),
  doorLocksType: preprocessEnum(doorLocksTypeEnum, "Please provide lock type"),
});

const peepHoleSchema = z.object({
  doorPeepHoleId: z.coerce.number().optional(),
  doorPeepHoleDistanceFromBottom: preprocessDouble("Please provide peephole distance"),
  doorPeepHoleDiameter: preprocessDouble("Please provide peephole diameter"),
});

const louverSchema = z.object({
  doorLouversId: z.coerce.number().optional(),
  doorLouversDistanceFromTop: preprocessDouble("Please provide louver top"),
  doorLouversDistanceFromLeft: preprocessDouble("Please provide louver left"),
  doorLouversWidth: preprocessDouble("Please provide louver width"),
  doorLouversHeight: preprocessDouble("Please provide louver height"),
});

const glassPanelSchema = z.object({
  doorGlassPanelsId: z.coerce.number().optional(),
  doorGlassPanelsDistanceFromTop: preprocessDouble("Please provide panel top"),
  doorGlassPanelsDistanceFromLeft: preprocessDouble("Please provide panel left"),
  doorGlassPanelsWidth: preprocessDouble("Please provide panel width"),
  doorGlassPanelsHeight: preprocessDouble("Please provide panel height"),
  doorGlassPanelsType: preprocessEnum(doorGlassPanelsTypeEnum, "Please provide panel type"),
});

const skeletonRailsSchema = z.object({
  doorSkeletonRailsId: z.coerce.number().optional(),
  doorSkeletonRailsWidth: preprocessDouble("Please provide rail width"),
  doorSkeletonRailsQuantity: preprocessDouble("Please provide rail qty"),
  doorSkeletonRailsEquallySpaced: preprocessEnum(yesOrNoEnum, "Please provide spacing"),
  doorSkeletonRailsEquallySpacedPositionsFromTop: preprocessDouble("Please provide rail pos"),
});

const skeletonStilesSchema = z.object({
  doorSkeletonStilesId: z.coerce.number().optional(),
  doorSkeletonStilesWidth: preprocessDouble("Please provide stile width"),
  doorSkeletonStilesQuantity: preprocessDouble("Please provide stile qty"),
  doorSkeletonStilesEquallySpaced: preprocessEnum(yesOrNoEnum, "Please provide spacing"),
  doorSkeletonStilesPositionsFromLeft: preprocessDouble("Please provide stile pos"),
});

const skeletonLockSetSchema = z.object({
  doorSkeletonLockSetId: z.coerce.number().optional(),
  doorSkeletonLockSetWidth: preprocessDouble("Please provide lockset width"),
  doorSkeletonLockSetHeight: preprocessDouble("Please provide lockset height"),
  doorSkeletonLockSetDistanceFromTopToCenter: preprocessDouble("Please provide top-to-center"),
  doorSkeletonLockSetSide: preprocessEnum(doorSkeletonLockSetSideEnum, "Please provide side"),
});

const skeletonSchema = z.object({
  doorSkeletonId: z.coerce.number().optional(),
  doorSkeletonMaterialType: preprocessEnum(doorSkeletonMaterialTypeEnum, "Please provide material"),
  doorSkeletonRails: preprocessDouble("Please provide skeleton rail value"),
  doorSkeletonStiles: preprocessDouble("Please provide skeleton stile value"),
  rails: z.array(skeletonRailsSchema).optional(),
  stiles: z.array(skeletonStilesSchema).optional(),
  lockSet: skeletonLockSetSchema.optional(),
});

export const doorPostSchema = z.object({
  doorProjectCode: preprocessString("Please provide project code"),
  doorCode: preprocessString("Please provide door code"),
  doorRevisionNumber: preprocessInt("Please provide revision number"),
  doorProjectName: preprocessString("Please provide project name"),
  doorCustomerId: preprocessInt("Please provide customer ID"),
  doorUserSaleId: preprocessInt("Please provide sale user ID"),

  doorDimensionsWidth: preprocessDouble("Please provide width"),
  doorDimensionsHeight: preprocessDouble("Please provide height"),
  doorDimensionsThickness: preprocessDouble("Please provide thickness"),

  doorType: preprocessEnum(doorTypeEnum, "Please provide door type"),
  doorSurfaceMaterial: preprocessEnum(doorSurfaceMaterialEnum, "Please provide surface material"),
  doorSurfaceThickness: preprocessDouble("Please provide surface thickness"),
  doorCoreMaterial: preprocessEnum(doorCoreMaterialEnum, "Please provide core material"),

  doorSurfaceTypeTop: preprocessEnum(doorSurfaceTypeEnum, "Please provide top surface type"),
  doorSurfaceTypeTopCode: preprocessString("Please provide top surface code"),
  doorSurfaceTypeTopThickness: z.string().optional(),
  doorSurfaceTypeTopDescription: z.string().optional(),

  doorSurfaceTypeBottom: preprocessEnum(doorSurfaceTypeEnum, "Please provide bottom surface type"),
  doorSurfaceTypeBottomCode: preprocessString("Please provide bottom surface code"),
  doorSurfaceTypeBottomThickness: z.string().optional(),
  doorSurfaceTypeBottomDescription: z.string().optional(),

  doorCreateBy: preprocessInt("Please provide creator ID"),

  grooveLines: z.array(grooveLineSchema).optional(),
  hinges: z.array(hingeSchema).optional(),
  locks: z.array(lockSchema).optional(),
  peepHole: peepHoleSchema.optional(),
  louvers: z.array(louverSchema).optional(),
  glassPanels: z.array(glassPanelSchema).optional(),
  skeleton: skeletonSchema.optional(),
});

export const doorPutSchema = z.object({
  doorId: preprocessInt("Please provide door ID"),
  doorProjectCode: preprocessString("Please provide project code"),
  doorCode: preprocessString("Please provide door code"),
  doorRevisionNumber: preprocessInt("Please provide revision number"),
  doorProjectName: preprocessString("Please provide project name"),
  doorCustomerId: preprocessInt("Please provide customer ID"),
  doorUserSaleId: preprocessInt("Please provide sale user ID"),

  doorDimensionsWidth: preprocessDouble("Please provide width"),
  doorDimensionsHeight: preprocessDouble("Please provide height"),
  doorDimensionsThickness: preprocessDouble("Please provide thickness"),

  doorType: preprocessEnum(doorTypeEnum, "Please provide door type"),
  doorSurfaceMaterial: preprocessEnum(doorSurfaceMaterialEnum, "Please provide surface material"),
  doorSurfaceThickness: preprocessDouble("Please provide surface thickness"),
  doorCoreMaterial: preprocessEnum(doorCoreMaterialEnum, "Please provide core material"),

  doorSurfaceTypeTop: preprocessEnum(doorSurfaceTypeEnum, "Please provide top surface type"),
  doorSurfaceTypeTopCode: preprocessString("Please provide top surface code"),
  doorSurfaceTypeTopThickness: z.string().optional(),
  doorSurfaceTypeTopDescription: z.string().optional(),

  doorSurfaceTypeBottom: preprocessEnum(doorSurfaceTypeEnum, "Please provide bottom surface type"),
  doorSurfaceTypeBottomCode: preprocessString("Please provide bottom surface code"),
  doorSurfaceTypeBottomThickness: z.string().optional(),
  doorSurfaceTypeBottomDescription: z.string().optional(),

  doorCreateBy: preprocessInt("Please provide creator ID"),

  grooveLines: z.array(grooveLineSchema).optional(),
  hinges: z.array(hingeSchema).optional(),
  locks: z.array(lockSchema).optional(),
  peepHole: peepHoleSchema.optional(),
  louvers: z.array(louverSchema).optional(),
  glassPanels: z.array(glassPanelSchema).optional(),
  skeleton: skeletonSchema.optional(),
  doorStatus: preprocessEnum(["Enable", "Disable"], "Please provide status"),
  doorUpdateBy: preprocessInt("Please provide updater ID"),
});

export const formatDoorData = (doors) =>
  formatData(doors, [], ["doorCreateAt", "doorUpdateAt"]);
