import React from "react";

/**
 * Tooltip — a short hint on hover or keyboard focus. Pure CSS, no portal.
 *
 * Props:
 *   label    – tooltip text
 *   position – "top" (default) | "bottom"
 */
const Tooltip = ({ label, position = "top", children }) => (
  <span className="group relative inline-flex">
    {children}
    <span
      role="tooltip"
      className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 ${
        position === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
      }`}
    >
      {label}
    </span>
  </span>
);

export default Tooltip;
