/** @type {import('tailwindcss').Config} */
const { brandEffects, extend, screens, colors } = require("./src/theme/tailwindTheme");

// Brand tokens are CSS variables (RGB channels) so each UI template can apply
// its client's palette at runtime. Defaults (Haluan gold) live in src/index.css
// :root.
const cssVar = (name) => `rgb(var(--${name}) / <alpha-value>)`;
const brand = brandEffects((n) => `var(--brand-${n})`);

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      ...extend,
      fontFamily: {
        ...extend.fontFamily,
        dm: ["var(--font-sans)", "var(--font-arabic)", "sans-serif"],
        display: ["var(--font-display)", "var(--font-arabic)", "sans-serif"],
      },
      backgroundImage: { ...extend.backgroundImage, ...brand.backgroundImage },
      boxShadow: { ...extend.boxShadow, ...brand.boxShadow },
    },
    screens,
    colors: () => ({
      ...colors,
      lightPrimary: cssVar("brand-50"),
      brandLinear: cssVar("brand-500"),
      brand: Object.fromEntries(
        [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => [n, cssVar(`brand-${n}`)])
      ),
      ink: cssVar("brand-ink"),
      // Text/icons on a solid brand-500 fill (dark on light brands, white on dark ones).
      "on-brand": cssVar("brand-on"),
    }),
  },
  plugins: [require("tailwindcss-rtl")],
};
