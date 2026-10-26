import { accentToken } from "../utils/tailwindExport";

// Colour data for Section 1 — Brand Identity & Colors.
//
// Brand colours (primary scale + ink) come from the client config
// (constants/clients/) via getBrandColors(). Navy, slate and the semantic
// colours are shared template neutrals. Green and red are never brand
// colours here; they only appear as functional success / error states.
//
// Shared hexes are copied from tailwind.config.js (CRA can't import files
// outside src/).
//
// `alpha` renders the swatch as hex + opacity (Tailwind's `/10` modifier).

const NAVY = {
  nameKey: "navy",
  prefix: "navy",
  shades: {
    50: "#D0DCFB", 100: "#AAC0FE", 200: "#A3B9F8", 300: "#728FEA", 400: "#3652BA",
    500: "#1B3BBB", 600: "#24388A", 700: "#1B254B", 800: "#111C44", 900: "#0B1437",
  },
};

const SLATE = {
  nameKey: "slate",
  prefix: "slate",
  shades: {
    50: "#F8FAFC", 100: "#F1F5F9", 200: "#E2E8F0", 300: "#CBD5E1", 400: "#94A3B8",
    500: "#64748B", 600: "#475569", 700: "#334155", 800: "#1E293B", 900: "#0F172A",
  },
};

/**
 * Brand-dependent swatches for a client's `colors` ({ brand, ink, accents }).
 * `accents` (optional) replace the default navy/slate supporting cards; each is
 * { label: { en, ar }, role: { en, ar }, hex }.
 */
export const getBrandColors = ({ brand, ink, accents }) => {
  const INK = { nameKey: "logo_black", token: "ink", hex: ink };

  return {
    PRIMARY: { nameKey: "brand_gold", token: "brand-500", hex: brand[500], aliases: ["brandLinear"] },
    INK,
    SCALES: {
      brand: { nameKey: "brand_gold", prefix: "brand", shades: brand },
      navy: NAVY,
      slate: SLATE,
    },
    SECONDARY_ACCENT: accents
      ? [...accents.map((a) => ({ ...a, nameKey: a.label.en, token: accentToken(a) })), { ...INK, roleKey: "role_black" }]
      : [
          { ...INK, roleKey: "role_black" },
          { nameKey: "navy",      token: "navy-700",  hex: "#1B254B", roleKey: "role_navy" },
          { nameKey: "navy_deep", token: "navy-900",  hex: "#0B1437", roleKey: "role_navy_deep" },
          { nameKey: "slate",     token: "slate-900", hex: "#0F172A", roleKey: "role_slate" },
        ],
    SURFACES: [
      { nameKey: "surface_page",     token: "white",        hex: "#FFFFFF" },
      { nameKey: "surface_subtle",   token: "slate-50",     hex: "#F8FAFC" },
      { nameKey: "surface_muted",    token: "slate-100",    hex: "#F1F5F9" },
      { nameKey: "surface_brand",    token: "brand-50",     hex: brand[50] },
      { nameKey: "surface_selected", token: "brand-500/10", hex: brand[500], alpha: 0.1 },
      { nameKey: "surface_dark",     token: "navy-700",     hex: "#1B254B" },
    ],
    TEXT: [
      { nameKey: "text_primary",   token: "slate-900", hex: "#0F172A" },
      { nameKey: "text_secondary", token: "slate-500", hex: "#64748B" },
      { nameKey: "text_muted",     token: "slate-400", hex: "#94A3B8" },
      { nameKey: "text_disabled",  token: "disabled:opacity-50", hex: "#64748B", alpha: 0.5, noteKey: "text_disabled_note" },
      { nameKey: "text_link",      token: "brand-800", hex: brand[800] },
      { nameKey: "text_inverse",   token: "white",     hex: "#FFFFFF", dark: true },
    ],
    BORDERS: [
      { nameKey: "border_default", token: "slate-200", hex: "#E2E8F0" },
      { nameKey: "border_subtle",  token: "slate-100", hex: "#F1F5F9" },
      { nameKey: "border_strong",  token: "slate-300", hex: "#CBD5E1" },
      { nameKey: "border_focus",   token: "brand-700", hex: brand[700] },
      { nameKey: "border_error",   token: "red-400",   hex: "#F87171" },
    ],
  };
};

// Semantic colours — functional only, not brand. Exact tokens AlertBanner / Toast use.
export const SEMANTIC = [
  {
    key: "success",
    base: { token: "green",      hex: "#007A3D" },
    bg:   { token: "green/5",    hex: "#007A3D", alpha: 0.05 },
    border: { token: "green/20", hex: "#007A3D", alpha: 0.2 },
    text: { token: "green",      hex: "#007A3D" },
  },
  {
    key: "warning",
    base: { token: "amber-500",  hex: "#F59E0B" },
    bg:   { token: "amber-50",   hex: "#FFFBEB" },
    border: { token: "amber-200", hex: "#FDE68A" },
    text: { token: "amber-600",  hex: "#D97706" },
  },
  {
    key: "error",
    base: { token: "red-500",    hex: "#F53939" },
    bg:   { token: "red-50",     hex: "#EE5D50", alpha: 0.1 },
    border: { token: "red-200",  hex: "#FECACA" },
    text: { token: "red-600",    hex: "#EA0606" },
  },
  {
    key: "info",
    base: { token: "blue-500",   hex: "#3B82F6" },
    bg:   { token: "blue-50",    hex: "#EFF6FF" },
    border: { token: "blue-200", hex: "#BFDBFE" },
    text: { token: "blue-600",   hex: "#2152FF" },
  },
];
