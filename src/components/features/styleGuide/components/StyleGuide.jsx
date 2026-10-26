import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdTranslate, MdMenu, MdMenuOpen, MdClose } from "react-icons/md";
import ClientLogo from "./ClientLogo";
import BrandIdentitySection from "./sections/BrandIdentitySection";
import TypographySection from "./sections/TypographySection";
import FoundationsSection from "./sections/FoundationsSection";
import ButtonsSection from "./sections/ButtonsSection";
import FormsSection from "./sections/FormsSection";
import NavigationSection from "./sections/NavigationSection";
import FeedbackSection from "./sections/FeedbackSection";
import ContentSection from "./sections/ContentSection";
import PopupsSection from "./sections/PopupsSection";
import DataDisplaySection from "./sections/DataDisplaySection";
import TablesSection from "./sections/TablesSection";
import WebsiteSection from "./sections/WebsiteSection";
import AuthSection from "./sections/AuthSection";
import DashboardSection from "./sections/DashboardSection";
import MobileSection from "./sections/MobileSection";
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
  navigation:  NavigationSection,
  feedback:    FeedbackSection,
  content:     ContentSection,
  popups:      PopupsSection,
  data:        DataDisplaySection,
  tables:      TablesSection,
  website:     WebsiteSection,
  auth:        AuthSection,
  dashboard:   DashboardSection,
  mobile:      MobileSection,
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

const CONTENTS_KEY = "zylen.styleGuide.contentsOpen";

const readContentsOpen = () => {
  try {
    return localStorage.getItem(CONTENTS_KEY) !== "false";
  } catch {
    return true;
  }
};

/** Numbered section links, shared by the sidebar and the phone drawer. */
const ContentsList = ({ active, onNavigate }) => {
  const t = useGuideT();
  return (
    <ul className="flex flex-col gap-0.5">
      {SECTIONS.map(({ id }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              active === id ? "bg-brand-50 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
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
  );
};

const GuidePage = () => {
  const { i18n } = useTranslation();
  const t = useGuideT();
  const client = useUiTemplate();
  const clientName = useClientName();
  const isAr = i18n.language === "ar";
  const active = useActiveSection(SECTION_IDS);
  // Sidebar on large screens (remembered per viewer); a drawer on smaller ones.
  const [contentsOpen, setContentsOpen] = useState(readContentsOpen);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CONTENTS_KEY, String(contentsOpen));
    } catch {
      // Storage unavailable (private mode) — the toggle still works for this visit.
    }
  }, [contentsOpen]);

  // While the drawer is open: Escape closes it and the page behind doesn't scroll.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const toggleContents = () => {
    if (window.matchMedia("(min-width: 992px)").matches) setContentsOpen((open) => !open);
    else setDrawerOpen(true);
  };
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
            <button
              type="button"
              onClick={toggleContents}
              aria-expanded={contentsOpen}
              aria-label={t("styleGuide.ui.contents")}
              title={t("styleGuide.ui.contents")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 print:hidden"
            >
              <MdMenu className="h-5 w-5" />
            </button>
            <ClientLogo variant="icon" className="h-9 w-9 shrink-0 rounded-md text-base" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{clientName}</p>
              <p className="truncate text-xs text-slate-400">{t("styleGuide.meta_title")}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 print:hidden">
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
        {/* Collapses to zero width; the negative margin cancels the flex gap. */}
        <div
          inert={!contentsOpen}
          className={`sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 overflow-hidden transition-[width,margin,opacity] duration-300 ease-in-out motion-reduce:transition-none lg:block print:hidden ${
            contentsOpen ? "w-52 opacity-100" : "w-0 opacity-0 ltr:-mr-10 rtl:-ml-10"
          }`}
        >
          <nav className="h-full w-52 overflow-y-auto py-14">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{t("styleGuide.ui.contents")}</p>
              <button
                type="button"
                onClick={() => setContentsOpen(false)}
                aria-label={t("styleGuide.ui.hide_contents")}
                title={t("styleGuide.ui.hide_contents")}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <MdMenuOpen className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
            <ContentsList active={active} />
          </nav>
        </div>

        <main className="min-w-0 flex-1">
          {SECTIONS.map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </main>
      </div>

      {/* ── Contents drawer (below lg) ── */}
      {/* Stays mounted so it can animate out; `invisible` waits for the slide to finish. */}
      <div
        inert={!drawerOpen}
        className={`fixed inset-0 z-50 transition-[visibility] duration-300 motion-reduce:transition-none lg:hidden print:hidden ${
          drawerOpen ? "visible" : "invisible"
        }`}
      >
        <button
          type="button"
          aria-label={t("styleGuide.ui.hide_contents")}
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          className={`absolute inset-y-0 w-72 max-w-[85%] overflow-y-auto bg-white p-5 shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ltr:left-0 rtl:right-0 ${
            drawerOpen ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{t("styleGuide.ui.contents")}</p>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label={t("styleGuide.ui.hide_contents")}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <MdClose className="h-5 w-5" />
            </button>
          </div>
          <ContentsList active={active} onNavigate={() => setDrawerOpen(false)} />
        </nav>
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
