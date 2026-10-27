import React from "react";
import { MdLock } from "react-icons/md";
import { useGuideT } from "../hooks/useUiTemplate";

/** Fake browser toolbar (dots + address bar) above a preview; `path` follows the site URL. */
const BrowserChrome = ({ path = "" }) => {
  const t = useGuideT();

  return (
    <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5" aria-hidden="true">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-200" dir="ltr">
        <MdLock className="h-3 w-3 shrink-0" />
        <span className="truncate">{t("styleGuide.website.url")}{path}</span>
      </div>
    </div>
  );
};

export default BrowserChrome;
