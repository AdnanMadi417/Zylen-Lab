// Kindergarten — brand colours from the client (Ocean Teal primary + four
// accents). Name, logo and fonts are still PLACEHOLDERS: add `logo` (+ optional
// `logoOnDark` and `logoIcon`; files in src/assets/branding/), and rename
// id/slug/name once the client name is known.
//
// Fonts: add Google Fonts families, e.g.
//   fonts: { sans: "Nunito", arabic: "Tajawal", display: "Baloo 2" },
// or { family: "Baloo 2", weights: "400;700" } if a family lacks some weights.
//
// The 50–900 scale is generated from Ocean Teal (#1B687D = 500): tints mixed
// with white, shades with black. Teal is dark, so text on it is white (onBrand).
const kindergarten = {
  id: "kindergarten",
  slug: "ui-template-kindergarten-2026",
  name: { en: "Kindergarten", ar: "روضة الأطفال" },
  logo: null,
  colors: {
    brand: {
      50: "#EFF4F6", 100: "#DDE8EC", 200: "#BBD2D8", 300: "#92B7C1", 400: "#5B92A1",
      500: "#1B687D", 600: "#17596C", 700: "#134B5A", 800: "#103C48", 900: "#0B2C34",
    },
    ink: "#0B2C34",
    onBrand: "#FFFFFF",
    accents: [
      {
        label: { en: "Fresh Turquoise", ar: "فيروزي منعش" },
        role: { en: "Secondary colour.", ar: "اللون الثانوي." },
        hex: "#46B1AC",
      },
      {
        label: { en: "Sunshine Yellow", ar: "أصفر مشمس" },
        role: { en: "Accent.", ar: "لون مميِّز." },
        hex: "#E7A922",
      },
      {
        label: { en: "Playful Red", ar: "أحمر مرِح" },
        role: { en: "Accent.", ar: "لون مميِّز." },
        hex: "#D93630",
      },
      {
        label: { en: "Warm Orange", ar: "برتقالي دافئ" },
        role: { en: "Accent.", ar: "لون مميِّز." },
        hex: "#DB6E2A",
      },
    ],
  },
  proposals: [],
};

export default kindergarten;
