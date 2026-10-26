import logo from "assets/branding/haluan-logo.png";

// Haluan — gold (#FEC20E) on black, sampled from haluan-logo.png.
const haluan = {
  id: "haluan",
  slug: "ui-template-haluan-2026",
  name: { en: "Haluan", ar: "هالوان" },
  // One file covers every version: gold on black works on light and dark.
  logo,
  logoOnDark: logo,
  logoIcon: logo,
  colors: {
    brand: {
      50: "#FFFBEA", 100: "#FFF3C4", 200: "#FFE78A", 300: "#FFDA52", 400: "#FFCF2E",
      500: "#FEC20E", 600: "#D99D00", 700: "#B47700", 800: "#925B0E", 900: "#784A0F",
    },
    ink: "#000000",
  },
  // Gaps found while auditing the palette. Text: styleGuide.brand.proposals.<key>.
  proposals: [
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
  ],
};

export default haluan;
