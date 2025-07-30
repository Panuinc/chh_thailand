import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const partnerPostSchema = z.object({
  partnerName: preprocessString("Please provide the partner name"),
  partnerCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const partnerPutSchema = z.object({
  partnerId: preprocessInt("Please provide the partner ID to update"),
  partnerName: preprocessString("Please provide the partner name"),
  partnerStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide 'Enable' or 'Disable'"
  ),
  partnerUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatPartnerData = (partners) =>
  formatData(partners, [], ["partnerCreateAt", "partnerUpdateAt"]);
