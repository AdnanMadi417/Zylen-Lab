import React from "react";
import { MdImage } from "react-icons/md";
import { useUiTemplate } from "../../../hooks/useUiTemplate";

/** Organic "pebble" outline used for photos, logos and icon badges. */
export const BLOB = "rounded-[58%_42%_47%_53%/48%_56%_44%_52%]";

/** Soft hex tint for backgrounds (hex + alpha). */
export const tint = (hex, alpha = "1A") => `${hex}${alpha}`;

/**
 * The four playful accents from the client config (Fresh Turquoise,
 * Sunshine Yellow, Playful Red, Warm Orange), falling back to brand shades.
 */
export const useAccents = () => {
  const { colors } = useUiTemplate();
  const a = colors.accents ?? [];
  return [
    a[0]?.hex ?? colors.brand[400],
    a[1]?.hex ?? colors.brand[300],
    a[2]?.hex ?? colors.brand[600],
    a[3]?.hex ?? colors.brand[700],
  ];
};

/** Wavy edge between areas, drawn in `currentColor` (the area it leads into). */
export const Wave = ({ className = "", flip = false }) => (
  <svg
    viewBox="0 0 1440 64"
    preserveAspectRatio="none"
    aria-hidden="true"
    className={`block h-6 w-full md:h-10 ${flip ? "rotate-180" : ""} ${className}`}
  >
    <path
      fill="currentColor"
      d="M0 32c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v32H0z"
    />
  </svg>
);

/** Small decorative 4-point sparkle. */
export const Sparkle = ({ className = "", color }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} style={{ color }}>
    <path fill="currentColor" d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z" />
  </svg>
);

/** Image slot: brand-tinted placeholder until the client supplies photography. */
export const ImageSlot = ({ className = "", color }) => (
  <div
    className={`flex items-center justify-center ${color ? "" : "bg-gradient-to-br from-brand-500/15 to-brand-50"} ${className}`}
    style={color ? { backgroundColor: tint(color, "26") } : undefined}
  >
    <MdImage className="h-10 w-10 text-brand-500/40" />
  </div>
);
