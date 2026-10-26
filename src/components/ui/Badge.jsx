import React from "react";

const VARIANTS = {
  neutral: "bg-slate-100 text-slate-600",
  brand:   "bg-brand-500/10 text-brand-800",
  success: "bg-green/10 text-green",
  warning: "bg-amber-50 text-amber-600",
  danger:  "bg-red-50 text-red-600",
  info:    "bg-blue-50 text-blue-600",
};

/**
 * Badge — a short status or category label.
 *
 * Props:
 *   variant – "neutral" | "brand" | "success" | "warning" | "danger" | "info"
 *   dot     – show a leading status dot
 *   solid   – filled brand style (for counts and highlights); ignores variant
 */
const Badge = ({ children, variant = "neutral", dot = false, solid = false, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
      solid ? "bg-brand-500 text-on-brand" : VARIANTS[variant]
    } ${className}`}
  >
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
    {children}
  </span>
);

export default Badge;
