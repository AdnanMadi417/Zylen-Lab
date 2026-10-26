import React from "react";

const SIZES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

const STATUS = { online: "bg-green", away: "bg-amber-500", offline: "bg-slate-300" };

const initials = (name = "") =>
  name.split(" ").map((n) => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "?";

/**
 * Avatar — a person's photo, or their initials until one exists.
 *
 * Props:
 *   name   – used for initials and alt text
 *   src    – image URL (optional)
 *   size   – "sm" | "md" (default) | "lg" | "xl"
 *   status – "online" | "away" | "offline" (optional dot)
 */
const Avatar = ({ name, src, size = "md", status, className = "" }) => (
  <span className={`relative inline-flex shrink-0 ${className}`}>
    <span
      className={`flex items-center justify-center overflow-hidden rounded-full bg-brand-500/10 font-bold text-brand-800 ring-2 ring-white ${SIZES[size]}`}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : <span aria-label={name}>{initials(name)}</span>}
    </span>
    {status && (
      <span className={`absolute bottom-0 h-3 w-3 rounded-full ring-2 ring-white ltr:right-0 rtl:left-0 ${STATUS[status]}`} />
    )}
  </span>
);

/** Overlapping avatars with a "+n" counter after `max`. */
export const AvatarGroup = ({ people, max = 4, size = "md" }) => {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  return (
    <span className="flex -space-x-2.5 rtl:space-x-reverse">
      {shown.map((p) => (
        <Avatar key={p.name} name={p.name} src={p.src} size={size} />
      ))}
      {rest > 0 && (
        <span className={`flex items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600 ring-2 ring-white ${SIZES[size]}`}>
          +{rest}
        </span>
      )}
    </span>
  );
};

export default Avatar;
