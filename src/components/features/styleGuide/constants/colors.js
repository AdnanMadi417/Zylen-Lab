// Colour data for Section 1 — Brand Identity & Colors.
//
// Brand: Haluan — gold (#FEC20E) on black, sampled from haluan-logo.png.
// Green and red are NOT brand colours; they only appear here as functional
// success / error status colours.
//
// Every hex below is copied from tailwind.config.js (CRA can't import files
// outside src/).
// define. Components were migrated from green to gold; green now remains only
// for success states. Entries with `proposed: true` await approval.
//
// `alpha` renders the swatch as hex + opacity (Tailwind's `/10` modifier).

export const PRIMARY = {
  nameKey: "brand_gold",
  token: "brand-500",
  hex: "#FEC20E",
  aliases: ["brandLinear"],
};

export const LOGO_BLACK = { nameKey: "logo_black", token: "black", hex: "#000000" };

export const SCALES = {
  brand: {
    nameKey: "brand_gold",
    prefix: "brand",
    shades: {
      50: "#FFFBEA", 100: "#FFF3C4", 200: "#FFE78A", 300: "#FFDA52", 400: "#FFCF2E",
      500: "#FEC20E", 600: "#D99D00", 700: "#B47700", 800: "#925B0E", 900: "#784A0F",
    },
  },
  navy: {
    nameKey: "navy",
    prefix: "navy",
    shades: {
      50: "#D0DCFB", 100: "#AAC0FE", 200: "#A3B9F8", 300: "#728FEA", 400: "#3652BA",
      500: "#1B3BBB", 600: "#24388A", 700: "#1B254B", 800: "#111C44", 900: "#0B1437",
    },
  },
  slate: {
    nameKey: "slate",
    prefix: "slate",
    shades: {
      50: "#F8FAFC", 100: "#F1F5F9", 200: "#E2E8F0", 300: "#CBD5E1", 400: "#94A3B8",
      500: "#64748B", 600: "#475569", 700: "#334155", 800: "#1E293B", 900: "#0F172A",
    },
  },
};

// Secondary & accent — brand-compatible colours already defined (plus logo black).
export const SECONDARY_ACCENT = [
  { ...LOGO_BLACK, roleKey: "role_black" },
  { nameKey: "navy",  token: "navy-700",  hex: "#1B254B", roleKey: "role_navy" },
  { nameKey: "navy_deep", token: "navy-900", hex: "#0B1437", roleKey: "role_navy_deep" },
  { nameKey: "slate", token: "slate-900", hex: "#0F172A", roleKey: "role_slate" },
];

export const SURFACES = [
  { nameKey: "surface_page",     token: "white",     hex: "#FFFFFF" },
  { nameKey: "surface_subtle",   token: "slate-50",  hex: "#F8FAFC" },
  { nameKey: "surface_muted",    token: "slate-100", hex: "#F1F5F9" },
  { nameKey: "surface_brand",    token: "brand-50",  hex: "#FFFBEA" },
  { nameKey: "surface_selected", token: "brand-500/10", hex: "#FEC20E", alpha: 0.1 },
  { nameKey: "surface_dark",     token: "navy-700",  hex: "#1B254B" },
];

export const TEXT = [
  { nameKey: "text_primary",   token: "slate-900", hex: "#0F172A" },
  { nameKey: "text_secondary", token: "slate-500", hex: "#64748B" },
  { nameKey: "text_muted",     token: "slate-400", hex: "#94A3B8" },
  { nameKey: "text_disabled",  token: "disabled:opacity-50", hex: "#64748B", alpha: 0.5, noteKey: "text_disabled_note" },
  { nameKey: "text_link",      token: "brand-800", hex: "#925B0E" },
  { nameKey: "text_inverse",   token: "white",     hex: "#FFFFFF", dark: true },
];

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

export const BORDERS = [
  { nameKey: "border_default", token: "slate-200", hex: "#E2E8F0" },
  { nameKey: "border_subtle",  token: "slate-100", hex: "#F1F5F9" },
  { nameKey: "border_strong",  token: "slate-300", hex: "#CBD5E1" },
  { nameKey: "border_focus",   token: "brand-700", hex: "#B47700" },
  { nameKey: "border_error",   token: "red-400",   hex: "#F87171" },
];

// Gaps found while auditing the palette. Proposals only — not applied globally.
export const PROPOSALS = [
  {
    key: "muted_text",
    current: ["#94A3B8"],
    proposed: [{ token: "slate-500", hex: "#64748B" }],
  },
  {
    key: "disabled_text",
    current: [],
    proposed: [{ token: "slate-300", hex: "#CBD5E1" }],
  },
  {
    key: "red_50",
    current: ["#EE5D501A"],
    proposed: [{ token: "red-50", hex: "#FEF2F2" }],
  },
];
