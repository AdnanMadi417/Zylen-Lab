import React from "react";

/**
 * Tabs — switches between views of the same page.
 *
 * Props:
 *   tabs     – { key, label, count?, icon? }[]
 *   value    – active tab key
 *   onChange – (key) => void
 *   variant  – "underline" (default) | "pills"
 */
const Tabs = ({ tabs, value, onChange, variant = "underline", className = "" }) => {
  const pills = variant === "pills";
  return (
    <div
      role="tablist"
      className={`flex overflow-x-auto ${pills ? "w-fit gap-1 rounded-full bg-slate-100 p-1" : "gap-1 border-b border-slate-200"} ${className}`}
    >
      {tabs.map((tab) => {
        const active = tab.key === value;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.key)}
            className={`inline-flex shrink-0 items-center gap-2 text-sm font-semibold transition-colors duration-150 ${
              pills
                ? `rounded-full px-4 py-1.5 ${active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`
                : `-mb-px border-b-2 px-3 py-2.5 ${active ? "border-brand-500 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] ${
                  active ? "bg-brand-500 text-on-brand" : "bg-slate-200/70 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
