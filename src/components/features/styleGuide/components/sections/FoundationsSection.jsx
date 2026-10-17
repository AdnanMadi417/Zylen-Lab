import React from "react";
import { useTranslation } from "react-i18next";
import GuideSection from "../GuideSection";
import { SPACING, RADII, SHADOWS, BREAKPOINTS } from "../../constants/tokens";

const Panel = ({ title, children }) => (
  <div className="rounded-primary border border-slate-200 bg-white p-6">
    <h3 className="mb-5 text-base font-semibold text-slate-900">{title}</h3>
    {children}
  </div>
);

const FoundationsSection = () => {
  const { t } = useTranslation();
  const maxBp = BREAKPOINTS[BREAKPOINTS.length - 1].px;

  return (
    <GuideSection
      id="foundations"
      title={t("styleGuide.foundations.title")}
      intro={t("styleGuide.foundations.intro")}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={t("styleGuide.foundations.spacing")}>
          <div className="flex flex-col gap-3" dir="ltr">
            {SPACING.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <span className="w-10 font-mono text-xs text-slate-400">{s.name}</span>
                <span className="h-4 rounded bg-brand-500" style={{ width: s.px * 2 }} />
                <span className="font-mono text-xs text-slate-500">{s.px}px</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={t("styleGuide.foundations.radius")}>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
            {RADII.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2 text-center">
                <span className={`h-16 w-16 border-2 border-brand-500 bg-brand-500/10 ${r.className}`} />
                <span className="font-mono text-[10px] text-slate-500" dir="ltr">{r.name}</span>
                <span className="font-mono text-[10px] text-slate-400" dir="ltr">{r.value}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={t("styleGuide.foundations.elevation")}>
          <div className="grid grid-cols-2 gap-6 rounded-2xl bg-slate-50 p-6 sm:grid-cols-4">
            {SHADOWS.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-3">
                <span className={`h-16 w-full rounded-2xl bg-white ${s.className}`} />
                <span className="text-center font-mono text-[10px] text-slate-500" dir="ltr">{s.name}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={t("styleGuide.foundations.breakpoints")}>
          <div className="flex flex-col gap-2.5" dir="ltr">
            {BREAKPOINTS.map((b) => (
              <div key={b.name} className="flex items-center gap-3">
                <span className="w-10 font-mono text-xs text-slate-400">{b.name}</span>
                <div className="h-6 flex-1 rounded-lg bg-slate-100">
                  <div
                    className="flex h-full items-center justify-end rounded-lg bg-navy-700 px-2"
                    style={{ width: `${(b.px / maxBp) * 100}%` }}
                  >
                    <span className="font-mono text-[10px] text-white">{b.px}px</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </GuideSection>
  );
};

export default FoundationsSection;
