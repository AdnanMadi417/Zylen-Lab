import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WebsitePreview from "./WebsitePreview";
import DashboardPreview from "./DashboardPreview";
import AuthPreview from "./AuthPreview";
import { useDesign } from "./designs";
import { UiTemplateProvider, useApplyClientColors, useApplyClientFonts, useUiTemplate } from "../hooks/useUiTemplate";

export const SCREENS = { website: WebsitePreview, dashboard: DashboardPreview, signin: AuthPreview };

const Screen = () => {
  const { screen } = useParams();
  const { i18n } = useTranslation();
  const client = useUiTemplate();
  const design = useDesign();
  useApplyClientColors(client.colors);
  useApplyClientFonts(client.fonts);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Unlisted page — keep it out of search engines.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const Component = SCREENS[screen] ?? design?.pages?.[screen];
  return Component ? <Component bare /> : null;
};

/**
 * One template screen on its own, full-bleed (/<slug>/preview/:screen). Loaded
 * in the style guide's phone frames, so responsive classes see a phone-sized
 * viewport.
 */
const ScreenPreview = ({ client }) => (
  <UiTemplateProvider value={client}>
    <Screen />
  </UiTemplateProvider>
);

export default ScreenPreview;
