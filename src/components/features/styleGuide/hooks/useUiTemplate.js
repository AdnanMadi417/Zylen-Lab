import { createContext, useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

const UiTemplateContext = createContext(null);

export const UiTemplateProvider = UiTemplateContext.Provider;

/** The active client config (see constants/clients/). */
export const useUiTemplate = () => useContext(UiTemplateContext);

/** Localised client name, e.g. "Haluan" / "هالوان". */
export const useClientName = () => {
  const client = useUiTemplate();
  const { i18n } = useTranslation();
  return client.name[i18n.language] ?? client.name.en;
};

/**
 * `t` for the style guide. A `styleGuide.*` key resolves to the client's
 * override at `uiTemplates.<id>.*` when one exists, and every string gets
 * `{{client}}` (the client name) interpolated.
 */
export const useGuideT = () => {
  const client = useUiTemplate();
  const clientName = useClientName();
  const { t, i18n } = useTranslation();

  return useCallback(
    (key, opts) => {
      const override = key.replace(/^styleGuide\./, `uiTemplates.${client.id}.`);
      return t(override !== key && i18n.exists(override) ? override : key, { client: clientName, ...opts });
    },
    [t, i18n, client.id, clientName]
  );
};

// Matches --brand-on in index.css (slate-900), for light brand colours.
export const DEFAULT_ON_BRAND = "#0F172A";

const toChannels = (hex) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");

/**
 * Applies the client's palette to the CSS variables behind Tailwind's brand-*,
 * ink and on-brand colours (on <html>, so portals/modals pick it up too).
 * Restores the defaults from index.css on unmount.
 */
export const useApplyClientColors = ({ brand, ink, onBrand = DEFAULT_ON_BRAND }) => {
  useEffect(() => {
    const root = document.documentElement.style;
    const vars = { "--brand-ink": toChannels(ink), "--brand-on": toChannels(onBrand) };
    Object.entries(brand).forEach(([shade, hex]) => {
      vars[`--brand-${shade}`] = toChannels(hex);
    });
    Object.entries(vars).forEach(([k, v]) => root.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.removeProperty(k));
  }, [brand, ink, onBrand]);
};

// Already loaded by index.css / index.html.
const PRELOADED_FONTS = ["DM Sans", "Cairo", "Poppins"];

/** "Nunito" or { family: "Nunito", weights: "400;700" } → { family, weights }. */
export const normalizeFont = (font) =>
  typeof font === "string" ? { family: font, weights: "400;500;600;700" } : font;

/**
 * Applies the client's typefaces ({ sans, arabic, display }, each optional) to
 * the --font-* variables in index.css, loading Google Fonts as needed.
 * Restores the defaults on unmount.
 */
export const useApplyClientFonts = (fonts) => {
  useEffect(() => {
    const root = document.documentElement.style;
    const links = [];
    const vars = {};
    ["sans", "arabic", "display"].forEach((role) => {
      if (!fonts?.[role]) return;
      const { family, weights } = normalizeFont(fonts[role]);
      vars[`--font-${role}`] = `'${family}'`;
      if (PRELOADED_FONTS.includes(family)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weights}&display=swap`;
      document.head.appendChild(link);
      links.push(link);
    });
    Object.entries(vars).forEach(([k, v]) => root.setProperty(k, v));
    return () => {
      Object.keys(vars).forEach((k) => root.removeProperty(k));
      links.forEach((l) => l.remove());
    };
  }, [fonts]);
};
