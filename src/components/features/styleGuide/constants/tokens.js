// Non-colour design tokens shown in the style guide (colours: ./colors.js).
//
// Mirrors tailwind.config.js — CRA can't import files outside src/, so these are
// duplicated here. When a token changes in tailwind.config.js, update it here too.

export const TYPE_SCALE = [
  { key: "display", className: "text-5xl font-bold",     spec: "48px · Bold"     },
  { key: "h1",      className: "text-3xl font-bold",     spec: "30px · Bold"     },
  { key: "h2",      className: "text-xl font-bold",      spec: "20px · Bold"     },
  { key: "h3",      className: "text-base font-semibold", spec: "16px · Semibold" },
  { key: "body",    className: "text-sm",                spec: "14px · Regular"  },
  { key: "caption", className: "text-xs text-slate-400", spec: "12px · Regular"  },
  { key: "overline", className: "text-[11px] font-semibold uppercase tracking-wider text-slate-400", spec: "11px · Semibold · Uppercase" },
];

export const FONTS = [
  { key: "dm",      family: "'DM Sans', sans-serif", usageKey: "font_dm"      },
  { key: "cairo",   family: "'Cairo', sans-serif",   usageKey: "font_cairo"   },
  { key: "poppins", family: "'Poppins', sans-serif", usageKey: "font_poppins" },
];

export const RADII = [
  { name: "rounded-lg",      value: "8px",  className: "rounded-lg"      },
  { name: "rounded-xl",      value: "12px", className: "rounded-xl"      },
  { name: "rounded-2xl",     value: "16px", className: "rounded-2xl"     },
  { name: "rounded-primary", value: "20px", className: "rounded-primary" },
  { name: "rounded-full",    value: "9999px", className: "rounded-full"  },
];

export const SHADOWS = [
  { name: "shadow-sm",           className: "shadow-sm"                    },
  { name: "shadow-3xl",          className: "shadow-3xl shadow-shadow-500" },
  { name: "shadow-glow-brand",   className: "shadow-glow-brand"            },
];

export const SPACING = [
  { name: "1",  px: 4  },
  { name: "2",  px: 8  },
  { name: "3",  px: 12 },
  { name: "4",  px: 16 },
  { name: "6",  px: 24 },
  { name: "8",  px: 32 },
  { name: "12", px: 48 },
];

export const BREAKPOINTS = [
  { name: "sm",  px: 576  },
  { name: "md",  px: 768  },
  { name: "lg",  px: 992  },
  { name: "xl",  px: 1200 },
  { name: "2xl", px: 1320 },
  { name: "3xl", px: 1600 },
];
