import React from "react";
import { useGuideT } from "../../hooks/useUiTemplate";
import GuideSection from "../GuideSection";
import { FONTS, TYPE_SCALE } from "../../constants/tokens";

const SAMPLE_GLYPHS = {
  dm:      "Aa Bb Cc 123",
  cairo:   "أ ب ت ١٢٣",
  poppins: "Aa Bb Cc 123",
};

const TypographySection = () => {
  const t = useGuideT();

  return (
    <GuideSection
      id="typography"
      title={t("styleGuide.typography.title")}
      intro={t("styleGuide.typography.intro")}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {FONTS.map((f) => (
          <div key={f.key} className="rounded-primary border border-slate-200 bg-white p-6">
            <p className="text-5xl font-bold text-slate-900" style={{ fontFamily: f.family }}>
              {SAMPLE_GLYPHS[f.key]}
            </p>
            <p className="mt-6 text-sm font-bold text-slate-900" dir="ltr">{f.family.split(",")[0].replace(/'/g, "")}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{t(`styleGuide.typography.${f.usageKey}`)}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-primary border border-slate-200 bg-white">
        {TYPE_SCALE.map((row) => (
          <div
            key={row.key}
            className="flex flex-col gap-2 border-b border-slate-100 px-6 py-5 last:border-b-0 md:flex-row md:items-center md:gap-8"
          >
            <div className="w-44 shrink-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t(`styleGuide.typography.scale.${row.key}`)}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-slate-400" dir="ltr">{row.spec}</p>
            </div>
            <p className={`min-w-0 truncate text-slate-900 ${row.className}`}>
              {t("styleGuide.typography.sample")}
            </p>
          </div>
        ))}
      </div>
    </GuideSection>
  );
};

export default TypographySection;
