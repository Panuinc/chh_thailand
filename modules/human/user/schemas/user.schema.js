import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const userPostSchema = z.object({
  userFirstName: preprocessString("Please provide the user name"),
  userCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const userPutSchema = z.object({
  userId: preprocessInt("Please provide the user ID to update"),
  userFirstName: preprocessString("Please provide the user name"),
  userStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  userUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatUserData = (users) =>
  formatData(users, [], ["userCreateAt", "userUpdateAt"]);
