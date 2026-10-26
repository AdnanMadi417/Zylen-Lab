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

const toChannels = (hex) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");

/**
 * Applies the client's palette to the CSS variables behind Tailwind's brand-*
 * and ink colours (on <html>, so portals/modals pick it up too). Restores the
 * defaults from index.css on unmount.
 */
export const useApplyClientColors = ({ brand, ink }) => {
  useEffect(() => {
    const root = document.documentElement.style;
    const vars = { "--brand-ink": toChannels(ink) };
    Object.entries(brand).forEach(([shade, hex]) => {
      vars[`--brand-${shade}`] = toChannels(hex);
    });
    Object.entries(vars).forEach(([k, v]) => root.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.removeProperty(k));
  }, [brand, ink]);
};
