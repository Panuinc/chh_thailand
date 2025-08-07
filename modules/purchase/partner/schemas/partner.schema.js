import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const partnerPostSchema = z.object({
  partnerName: preprocessString("Please provide the partner name"),
  partnerTaxId: preprocessString("Please provide the tax ID"),
  partnerPhone: preprocessString("Please provide the phone"),
  partnerAddress: preprocessString("Please provide the address"),
  partnerEmail: preprocessString("Please provide the email"),
  partnerCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const partnerPutSchema = z.object({
  partnerId: preprocessInt("Please provide the partner ID to update"),
  partnerName: preprocessString("Please provide the partner name"),
  partnerTaxId: preprocessString("Please provide the tax ID"),
  partnerPhone: preprocessString("Please provide the phone"),
  partnerAddress: preprocessString("Please provide the address"),
  partnerEmail: preprocessString("Please provide the email"),
  partnerStatus: preprocessEnum(
    ["Enable", "Disable"],
    "Please provide status'"
  ),
  partnerUpdateBy: preprocessInt("Please provide the updater's user ID"),
});

export const formatPartnerData = (partners) =>
  formatData(partners, [], ["partnerCreateAt", "partnerUpdateAt"]);
