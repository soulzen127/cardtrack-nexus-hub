
import React from "react";
import { ThemeSettings, BrandSettings, DisplaySettings } from "./appearance";

export const AppearanceSettings = () => {
  return (
    <div className="space-y-6">
      <ThemeSettings />
      <BrandSettings />
      <DisplaySettings />
    </div>
  );
};
