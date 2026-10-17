import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdCode, MdContentCopy, MdCheck } from "react-icons/md";

/**
 * Template block for documenting one component: title, description, a live
 * preview canvas and an optional collapsible code snippet.
 *
 * Props:
 *   title       – component name
 *   description – what it's for / when to use it
 *   code        – usage snippet (string), hidden behind a toggle
 *   canvas      – "light" (default) | "muted" — preview background
 *   children    – the live demo
 */
const ComponentShowcase = ({ title, description, code, canvas = "light", children }) => {
  const { t } = useTranslation();
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="overflow-hidden rounded-primary border border-slate-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description && <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>}
        </div>
        {code && (
          <button
            type="button"
            onClick={() => setShowCode((s) => !s)}
            aria-expanded={showCode}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              showCode
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
            }`}
          >
            <MdCode className="h-4 w-4" />
            {showCode ? t("styleGuide.ui.hide_code") : t("styleGuide.ui.show_code")}
          </button>
        )}
      </div>

      <div className={`p-6 sm:p-8 ${canvas === "muted" ? "bg-slate-50" : "bg-white"}`}>{children}</div>

      {code && showCode && (
        <div className="relative border-t border-slate-100 bg-slate-900" dir="ltr">
          <button
            type="button"
            onClick={copy}
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/20"
          >
            {copied ? <MdCheck className="h-3.5 w-3.5" /> : <MdContentCopy className="h-3.5 w-3.5" />}
            {copied ? t("common.copied") : t("styleGuide.ui.copy")}
          </button>
          <pre className="overflow-x-auto p-5 pr-24 text-xs leading-relaxed text-slate-200">
            <code>{code.trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ComponentShowcase;
