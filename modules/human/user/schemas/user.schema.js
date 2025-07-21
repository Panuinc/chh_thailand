import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  preprocessDate,
  preprocessDateOptional,
  preprocessFileFlexible,
  formatData,
} from "@/lib/zodSchema";

export const userPostSchema = z.object({
  userFirstName: preprocessString("Please provide the user's first name"),
  userLastName: preprocessString("Please provide the user's last name"),
  userPhone: preprocessString("Please provide the user's phone"),
  userEmail: preprocessString("Please provide the user's email"),
  userPicture: preprocessFileFlexible(),

  userCreateBy: preprocessInt("Please provide the creator's user ID"),

  useJobDivisionId: preprocessInt("Please provide Division ID"),
  useJobDepartmentId: preprocessInt("Please provide Department ID"),
  useJobPositionId: preprocessInt("Please provide Position ID"),
  useJobRoleId: preprocessInt("Please provide Role ID"),
  useJobStartDate: preprocessDate("Please provide start date (YYYY-MM-DD)"),
  useJobContractType: preprocessEnum(
    ["FullTime", "PartTime", "Internship", "Temporary", "Freelance"],
    "Please provide contract type"
  ),
});

export const userPutSchema = z.object({
  userId: preprocessInt("Please provide user ID"),
  userFirstName: preprocessString("Please provide the user's first name"),
  userLastName: preprocessString("Please provide the user's last name"),
  userPhone: preprocessString("Please provide the user's phone"),
  userEmail: preprocessString("Please provide the user's email"),
  userPicture: preprocessFileFlexible(),

  userUpdateBy: preprocessInt("Please provide the updater's user ID"),

  useJobDivisionId: preprocessInt("Please provide Division ID"),
  useJobDepartmentId: preprocessInt("Please provide Department ID"),
  useJobPositionId: preprocessInt("Please provide Position ID"),
  useJobRoleId: preprocessInt("Please provide Role ID"),
  useJobStartDate: preprocessDate("Please provide start date (YYYY-MM-DD)"),
  useJobEndDate: preprocessDateOptional(
    "Please provide start date (YYYY-MM-DD)"
  ),
  useJobContractType: preprocessEnum(
    ["FullTime", "PartTime", "Internship", "Temporary", "Freelance"],
    "Please provide contract type"
  ),
  userStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable"
  ),
});

export const formatUserData = (users) =>
  formatData(
    users,
    ["job.useJobStartDate", "job.useJobEndDate"],
    ["userCreateAt", "userUpdateAt"]
  );
