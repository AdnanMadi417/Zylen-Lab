import React from "react";
import {
  MdArrowForward,
  MdImage,
  MdArticle,
  MdCalendarToday,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdLock,
  MdFormatQuote,
  MdMenu,
} from "react-icons/md";
import StarRating from "components/ui/StarRating";
import ClientLogo from "./ClientLogo";
import { useClientName, useGuideT } from "../hooks/useUiTemplate";

const NAV = ["home", "about", "programs", "news", "contact"];
const STATS = ["1", "2", "3", "4"];
const CARDS = ["1", "2", "3"];
const FOOTER_COLS = [
  { key: "explore", links: ["home", "about", "programs"] },
  { key: "help", links: ["news", "contact"] },
];

/** Image slot: brand-tinted placeholder until the client supplies photography. */
const ImageSlot = ({ className = "" }) => (
  <div className={`flex items-center justify-center bg-gradient-to-br from-brand-500/15 to-brand-50 ${className}`}>
    <MdImage className="h-10 w-10 text-brand-500/40" />
  </div>
);

/**
 * A public homepage in the client's branding. Mirrors the styling of the live
 * public components (PublicNavbar, HeroSection, NewsCard, CallToAction,
 * Footer), which fetch Haluan data and can't render inside a template.
 * Copy: styleGuide.website.* (override per client under uiTemplates).
 * `bare` drops the browser chrome (used in the phone frames).
 */
const WebsitePreview = ({ bare = false }) => {
  const t = useGuideT();
  const s = (k, o) => t(`styleGuide.website.${k}`, o);
  const clientName = useClientName();

  return (
    <div className={bare ? "bg-white" : "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"}>
      {/* ── Browser chrome ── */}
      {!bare && (
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5" aria-hidden="true">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-200" dir="ltr">
          <MdLock className="h-3 w-3 shrink-0" />
          <span className="truncate">{s("url")}</span>
        </div>
      </div>
      )}

      {/* ── Navbar ── */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-3.5">
        <div className="flex shrink-0 items-center gap-2.5">
          <ClientLogo variant="icon" className="h-9 w-9 rounded-lg text-base" />
          <p className="text-base font-extrabold text-slate-900">{clientName}</p>
        </div>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((key, i) => (
            <span
              key={key}
              className={`rounded-full px-3.5 py-2 text-sm font-medium ${i === 0 ? "bg-brand-500/10 text-brand-800" : "text-slate-500"}`}
            >
              {s(`nav_${key}`)}
            </span>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden px-3 py-2 text-sm font-medium text-slate-500 sm:inline">{s("sign_in")}</span>
          <span className="rounded-full bg-brand-500 px-5 py-2 text-sm font-bold text-on-brand shadow-sm shadow-brand-500/30">
            {s("nav_cta")}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 lg:hidden">
            <MdMenu className="h-5 w-5" />
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-dot-brand bg-[size:32px_32px] opacity-40" />
        <div className="pointer-events-none absolute -top-32 h-96 w-96 rounded-full bg-brand-500 opacity-20 blur-3xl ltr:-right-32 rtl:-left-32" />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {s("hero_badge")}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-slate-900 lg:text-5xl">
              {s("hero_title")}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">{s("hero_subtitle")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3 text-sm font-bold text-on-brand shadow-glow-brand">
                {s("hero_cta")} <MdArrowForward className="h-4 w-4 rtl:rotate-180" />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                {s("hero_cta2")}
              </span>
            </div>
          </div>
          <div className="relative hidden h-80 md:block">
            <ImageSlot className="absolute top-0 h-[62%] w-[62%] rounded-3xl shadow-2xl ltr:right-0 rtl:left-0" />
            <ImageSlot className="absolute bottom-0 h-[52%] w-[66%] rounded-3xl shadow-xl ltr:left-0 rtl:right-0" />
            <div className="absolute top-[40%] flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl ltr:right-[-4%] rtl:left-[-4%]">
              <div>
                <p className="text-lg font-black leading-none text-slate-900">{s("stat_1_value")}</p>
                <p className="text-[11px] font-medium text-slate-500">{s("stat_1_label")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="bg-ink px-6 py-10">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {STATS.map((n) => (
            <div key={n}>
              <p className="text-3xl font-black text-white">{s(`stat_${n}_value`)}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-300">{s(`stat_${n}_label`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Content cards ── */}
      <section className="px-6 py-14">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-800">{s("cards_label")}</span>
        <h2 className="mt-2 text-3xl font-black text-slate-900">{s("cards_title")}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CARDS.map((n) => (
            <div key={n} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <ImageSlot className="h-36" />
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-brand-800">
                  <MdArticle className="h-3.5 w-3.5" /> {s(`card_${n}_cat`)}
                </span>
                <h3 className="mb-1.5 text-base font-bold text-slate-900">{s(`card_${n}_title`)}</h3>
                <p className="mb-3 text-sm text-slate-500">{s(`card_${n}_excerpt`)}</p>
                <span className="mt-auto flex items-center gap-1 text-xs text-slate-400">
                  <MdCalendarToday className="h-3.5 w-3.5" /> <span dir="ltr">{s(`card_${n}_date`)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="bg-brand-50 px-6 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <MdFormatQuote className="mx-auto h-10 w-10 text-brand-500" />
          <p className="mt-4 text-xl font-semibold leading-relaxed text-slate-900">{s("quote")}</p>
          <div className="mt-5 flex justify-center">
            <StarRating value={5} />
          </div>
          <p className="mt-3 text-sm font-bold text-slate-900">{s("quote_name")}</p>
          <p className="text-xs text-slate-500">{s("quote_role")}</p>
        </div>
      </section>

      {/* ── Call to action ── */}
      <section className="bg-slate-50 px-6 py-16 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-800">{s("cta_label")}</span>
        <h2 className="mt-3 text-3xl font-black leading-tight text-slate-900">{s("cta_title")}</h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400">{s("cta_desc")}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3 text-sm font-bold text-on-brand shadow-glow-brand">
            {s("cta_btn")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700">
            {s("nav_contact")} <MdArrowForward className="h-4 w-4 rtl:rotate-180" />
          </span>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative overflow-hidden bg-ink px-6 pb-8 pt-12">
        <div className="pointer-events-none absolute inset-0 bg-dot-white bg-[size:32px_32px] opacity-[0.04]" />
        <div className="pointer-events-none absolute -top-40 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl ltr:-right-40 rtl:-left-40" />
        <div className="relative grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.6fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ClientLogo variant="onDark" className="h-12 w-12 rounded-xl text-xl ring-1 ring-white/15" />
              <p className="text-lg font-extrabold text-brand-300">{clientName}</p>
            </div>
            <p className="max-w-[240px] text-sm leading-relaxed text-white/55">{s("footer_desc")}</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/55">
              <li className="flex items-center gap-2.5"><MdLocationOn className="h-4 w-4 shrink-0 text-white/40" />{s("footer_address")}</li>
              <li className="flex items-center gap-2.5"><MdEmail className="h-4 w-4 shrink-0 text-white/40" /><span dir="ltr">{s("footer_email")}</span></li>
              <li className="flex items-center gap-2.5"><MdPhone className="h-4 w-4 shrink-0 text-white/40" /><span dir="ltr">{s("footer_phone")}</span></li>
            </ul>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.key}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">{s(`footer_${col.key}`)}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l} className="text-sm text-white/55">{s(`nav_${l}`)}</li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">{s("newsletter_title")}</p>
            <p className="mb-3 text-sm text-white/55">{s("newsletter_desc")}</p>
            <div className="flex gap-2">
              <span className="min-w-0 flex-1 truncate rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/40">
                {s("newsletter_ph")}
              </span>
              <span className="shrink-0 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-on-brand">{s("newsletter_btn")}</span>
            </div>
          </div>
        </div>
        <div className="relative mt-10 border-t border-white/10 pt-6 text-xs text-white/35">
          {s("footer_copy", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default WebsitePreview;
