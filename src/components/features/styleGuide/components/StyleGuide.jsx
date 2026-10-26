import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdTranslate, MdPrint } from "react-icons/md";
import ClientLogo from "./ClientLogo";
import BrandIdentitySection from "./sections/BrandIdentitySection";
import TypographySection from "./sections/TypographySection";
import FoundationsSection from "./sections/FoundationsSection";
import ButtonsSection from "./sections/ButtonsSection";
import FormsSection from "./sections/FormsSection";
import FeedbackSection from "./sections/FeedbackSection";
import PopupsSection from "./sections/PopupsSection";
import DataDisplaySection from "./sections/DataDisplaySection";
import TablesSection from "./sections/TablesSection";
import WebsiteSection from "./sections/WebsiteSection";
import AuthSection from "./sections/AuthSection";
import DashboardSection from "./sections/DashboardSection";
import HandoffSection from "./sections/HandoffSection";
import { SECTION_IDS, sectionNumber } from "../constants/sections";
import {
  UiTemplateProvider,
  useApplyClientColors,
  useApplyClientFonts,
  useClientName,
  useGuideT,
  useUiTemplate,
} from "../hooks/useUiTemplate";

// To add a section: create it under sections/, give its <GuideSection> an id,
// add that id to constants/sections.js (sets the order + number) and map it here.
const COMPONENTS = {
  brand:       BrandIdentitySection,
  typography:  TypographySection,
  foundations: FoundationsSection,
  buttons:     ButtonsSection,
  forms:       FormsSection,
  feedback:    FeedbackSection,
  popups:      PopupsSection,
  data:        DataDisplaySection,
  tables:      TablesSection,
  website:     WebsiteSection,
  auth:        AuthSection,
  dashboard:   DashboardSection,
  handoff:     HandoffSection,
};

const SECTIONS = SECTION_IDS.map((id) => ({ id, Component: COMPONENTS[id] }));

const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

const GuidePage = () => {
  const { i18n } = useTranslation();
  const t = useGuideT();
  const client = useUiTemplate();
  const clientName = useClientName();
  const isAr = i18n.language === "ar";
  const active = useActiveSection(SECTION_IDS);
  useApplyClientColors(client.colors);
  useApplyClientFonts(client.fonts);

  // Direction + lang follow the selected language, as in PublicLayout.
  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [isAr, i18n.language]);

  // Unlisted page — keep it out of search engines.
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = `${t("styleGuide.meta_title")} · ${clientName}`;
    return () => {
      meta.remove();
      document.title = prevTitle;
    };
  }, [t, clientName]);

  const toggleLanguage = () => i18n.changeLanguage(isAr ? "en" : "ar");

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur print:static">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <ClientLogo variant="icon" className="h-9 w-9 shrink-0 rounded-md text-base" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{clientName}</p>
              <p className="truncate text-xs text-slate-400">{t("styleGuide.meta_title")}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 sm:inline-flex"
            >
              <MdPrint className="h-4 w-4" /> {t("styleGuide.ui.print")}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-brand-300 transition-opacity hover:opacity-90"
            >
              <MdTranslate className="h-4 w-4" /> {isAr ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-dot-white bg-[length:22px_22px]" />
        <div className="absolute -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl ltr:right-0 rtl:left-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-brand">
            {t("styleGuide.hero.badge")}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
            {t("styleGuide.hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{t("styleGuide.hero.subtitle")}</p>
          <div className="mt-8 flex gap-2">
            <span className="h-2 w-16 rounded-full bg-brand-500" />
            <span className="h-2 w-8 rounded-full bg-brand-500/50" />
            <span className="h-2 w-8 rounded-full bg-brand-500/25" />
            <span className="h-2 w-8 rounded-full bg-white" />
          </div>
          <ClientLogo
            variant="onDark"
            decorative
            className="absolute end-6 top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-3xl text-8xl lg:flex"
          />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto flex max-w-7xl gap-10 px-4 sm:px-6">
        <nav className="sticky top-16 hidden h-[calc(100vh-4rem)] w-52 shrink-0 overflow-y-auto py-14 lg:block print:hidden">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {t("styleGuide.ui.contents")}
          </p>
          <ul className="flex flex-col gap-0.5">
            {SECTIONS.map(({ id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    active === id
                      ? "bg-brand-50 text-slate-900"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <span className={`font-mono text-[11px] ${active === id ? "text-brand-700" : "text-slate-300"}`}>
                    {sectionNumber(id)}
                  </span>
                  {t(`styleGuide.${id}.title`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 flex-1">
          {SECTIONS.map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </main>
      </div>

      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400">
        {t("styleGuide.footer", { year: new Date().getFullYear() })}
      </footer>
    </div>
  );
};

/** A client's UI template page. `client` is an entry from constants/clients/. */
const StyleGuide = ({ client }) => (
  <UiTemplateProvider value={client}>
    <GuidePage />
  </UiTemplateProvider>
);

export default StyleGuide;
