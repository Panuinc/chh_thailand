import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const positionPostSchema = z.object({
  positionDivisionId: preprocessInt("Please select division"),
  positionDepartmentId: preprocessInt("Please select department"),
  positionName: preprocessString("Please provide the position name"),
  positionCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const positionPutSchema = z.object({
  positionId: preprocessInt("Please provide the position ID to update"),
  positionName: preprocessString("Please provide the position name"),
  positionStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide status'"
  ),
  positionUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatPositionData = (positions) =>
  formatData(positions, [], ["positionCreateAt", "positionUpdateAt"]);
