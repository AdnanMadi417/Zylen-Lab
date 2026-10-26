import React from "react";
import { useClientName, useUiTemplate } from "../hooks/useUiTemplate";

/** Config field for each logo version; missing versions fall back to `logo`. */
export const LOGO_FIELDS = { default: "logo", onDark: "logoOnDark", icon: "logoIcon" };

/** The logo file for a version, or null when the client hasn't supplied one. */
export const logoFor = (client, variant = "default") => client[LOGO_FIELDS[variant]] ?? client.logo ?? null;

/**
 * The active client's logo in the requested version ("default" | "onDark" |
 * "icon"), or — until one is supplied — an ink tile with the client's initial
 * in the brand colour.
 */
const ClientLogo = ({ variant = "default", className = "", decorative = false }) => {
  const client = useUiTemplate();
  const name = useClientName();
  const logo = logoFor(client, variant);
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
