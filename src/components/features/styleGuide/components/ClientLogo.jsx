import React from "react";
import { useClientName, useUiTemplate } from "../hooks/useUiTemplate";

/**
 * The active client's logo, or — until one is supplied — an ink tile with the
 * client's initial in the brand colour.
 */
const ClientLogo = ({ className = "", decorative = false }) => {
  const { logo } = useUiTemplate();
  const name = useClientName();
  const alt = decorative ? "" : name;

  if (logo) {
    return <img src={logo} alt={alt} aria-hidden={decorative || undefined} className={`object-contain ${className}`} />;
  }
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative || undefined}
      className={`flex items-center justify-center bg-ink font-bold text-brand-300 ${className}`}
    >
      {name.charAt(0)}
    </span>
  );
};

export default ClientLogo;
