import React from "react";
import { normalizeFont, useGuideT, useUiTemplate } from "../../hooks/useUiTemplate";
import GuideSection from "../GuideSection";
import { DEFAULT_FONTS, TYPE_SCALE } from "../../constants/tokens";

const TypographySection = () => {
  const t = useGuideT();
  const { fonts = {} } = useUiTemplate();
  const family = (role) => normalizeFont(fonts[role] ?? DEFAULT_FONTS[role]).family;

  const cards = [
    { role: "sans",   family: family("sans"),   usageKey: "font_dm",    glyphs: "Aa Bb Cc 123" },
    { role: "arabic", family: family("arabic"), usageKey: "font_cairo", glyphs: "أ ب ت ١٢٣" },
    fonts.display && { role: "display", family: family("display"), usageKey: "font_poppins", glyphs: "Aa Bb Cc 123" },
  ].filter(Boolean);

  return (
    <GuideSection
      id="typography"
      title={t("styleGuide.typography.title")}
      intro={t("styleGuide.typography.intro")}
    >
      <div className={`grid gap-4 ${cards.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {cards.map((f) => (
          <div key={f.role} className="rounded-primary border border-slate-200 bg-white p-6">
            <p className="text-5xl font-bold text-slate-900" style={{ fontFamily: `'${f.family}'` }}>
              {f.glyphs}
            </p>
            <p className="mt-6 text-sm font-bold text-slate-900" dir="ltr">{f.family}</p>
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
