import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdTranslate, MdPalette, MdDashboardCustomize, MdIosShare, MdArrowForward } from "react-icons/md";

// Zylen palette, sampled from public/assets/background/blur-img-bg.png.
// Kept as arbitrary values so the brand-* variables stay free for client templates.
const STEPS = [
  { key: "brand",    Icon: MdPalette },
  { key: "template", Icon: MdDashboardCustomize },
  { key: "handoff",  Icon: MdIosShare },
];

const INCLUDES = ["colors", "typography", "components", "forms", "dashboards", "bilingual"];

/**
 * Zylen-Lab landing page. Deliberately lists no clients: each client's
 * template is an unlisted URL (/ui-template-<client>-<year>) shared directly.
 */
const ZylenLabLanding = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [isAr, i18n.language]);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = t("zylenLab.meta_title");
    return () => {
      document.title = prevTitle;
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-[#042538] text-white">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <img
          src="/assets/background/blur-img-bg-1.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-dot-white bg-[length:22px_22px] opacity-40" />

        <header className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <img src="/assets/brand/white-logo.png" alt="Zylen" className="h-8 w-auto" />
          <button
            type="button"
            onClick={() => i18n.changeLanguage(isAr ? "en" : "ar")}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/10"
          >
            <MdTranslate className="h-4 w-4" /> {isAr ? "English" : "العربية"}
          </button>
        </header>

        <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-20 sm:px-6 md:pb-36 md:pt-28">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9BD5EB] backdrop-blur">
            {t("zylenLab.hero.badge")}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            {t("zylenLab.hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {t("zylenLab.hero.subtitle")}
          </p>
          <a
            href="#how"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#042538] transition-opacity hover:opacity-90"
          >
            {t("zylenLab.hero.cta")}
            <MdArrowForward className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </div>

      {/* ── How it works ── */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-20 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3CADD9]">{t("zylenLab.how.eyebrow")}</p>
        <h2 className="mt-2 text-3xl font-bold">{t("zylenLab.how.title")}</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ key, Icon }, i) => (
            <li key={key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#183791] text-[#9BD5EB]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-sm text-white/30">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{t(`zylenLab.how.steps.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{t(`zylenLab.how.steps.${key}.desc`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── What's inside ── */}
      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3CADD9]">{t("zylenLab.includes.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-bold">{t("zylenLab.includes.title")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{t("zylenLab.includes.subtitle")}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {INCLUDES.map((key) => (
              <li key={key} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-medium">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#3CADD9]" />
                {t(`zylenLab.includes.items.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <img src="/assets/brand/white-icon-bg.png" alt="" aria-hidden="true" className="h-6 w-auto opacity-60" />
          <p className="text-xs text-white/40">{t("zylenLab.footer", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
};

export default ZylenLabLanding;
