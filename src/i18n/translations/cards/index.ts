
import { combineTranslations } from "../utils";
import { cardManagementTranslations } from "./management";
import { cardRegisterTranslations } from "./register";
import { cardStatusTranslations } from "./status";
import { cardImportExportTranslations } from "./import-export";
import { cardDetailsTranslations } from "./details";

// Combine all cards-related translation categories
export const cardsTranslations = combineTranslations([
  cardManagementTranslations,
  cardRegisterTranslations,
  cardStatusTranslations,
  cardImportExportTranslations,
  cardDetailsTranslations
]);
