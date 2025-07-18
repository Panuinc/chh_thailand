import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const departmentPostSchema = z.object({
  departmentDivisionId: preprocessInt("Please select division"),
  departmentName: preprocessString("Please provide the department name"),
  departmentCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const departmentPutSchema = z.object({
  departmentId: preprocessInt("Please provide the department ID to update"),
  departmentDivisionId: preprocessInt("Please select division"),
  departmentName: preprocessString("Please provide the department name"),
  departmentStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  departmentUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatDepartmentData = (departments) =>
  formatData(departments, [], ["departmentCreateAt", "departmentUpdateAt"]);
