import React from "react";
import { MdMenu, MdNotifications } from "react-icons/md";
import ClientLogo from "../../ClientLogo";
import { useClientName, useGuideT } from "../../../hooks/useUiTemplate";
import { BLOB, tint, useAccents } from "./decor";

const NAV = ["home", "about", "programs", "news", "contact"];

/**
 * Kindergarten website navbar. `active` is the highlighted nav key; with a
 * `user` ({ name, initial }) it shows the signed-in parent instead of the
 * "Enrol now" button.
 */
const SiteHeader = ({ active = "home", user }) => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.website.${k}`);
  const clientName = useClientName();
  const [, , red, orange] = useAccents();

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div className="flex shrink-0 items-center gap-2.5">
        <ClientLogo variant="icon" className={`h-10 w-10 text-base ${BLOB}`} />
        <p className="font-display text-lg font-black text-ink">{clientName}</p>
      </div>
      <nav className="hidden items-center gap-1 lg:flex">
        {NAV.map((key) => (
          <span
            key={key}
            className={`relative px-3.5 py-2 text-sm font-semibold ${key === active ? "text-brand-700" : "text-slate-500"}`}
          >
            {s(`nav_${key}`)}
            {key === active && (
              <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: orange }} />
            )}
          </span>
        ))}
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        {user ? (
          <>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <MdNotifications className="h-5 w-5" />
              <span className="absolute top-2 h-2 w-2 rounded-full ring-2 ring-white ltr:right-2.5 rtl:left-2.5" style={{ backgroundColor: red }} />
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white py-1 ring-1 ring-slate-200 ltr:pl-1 ltr:pr-3 rtl:pl-3 rtl:pr-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: orange }}>
                {user.initial}
              </span>
              <span className="hidden text-sm font-bold text-ink sm:inline">{user.name}</span>
            </span>
          </>
        ) : (
          <span
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md"
            style={{ backgroundColor: orange, boxShadow: `0 6px 16px ${tint(orange, "59")}` }}
          >
            {s("nav_cta")}
          </span>
        )}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 lg:hidden">
          <MdMenu className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
};

export default SiteHeader;
