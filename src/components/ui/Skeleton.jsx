import React from "react";

/**
 * Skeleton — a pulsing placeholder shown while content loads. Size and shape
 * come from `className` (e.g. "h-4 w-32", "h-10 w-10 rounded-full").
 */
const Skeleton = ({ className = "" }) => (
  <span className={`block animate-pulse bg-slate-200/80 ${/\brounded/.test(className) ? "" : "rounded-lg"} ${className}`} />
);

export default Skeleton;
