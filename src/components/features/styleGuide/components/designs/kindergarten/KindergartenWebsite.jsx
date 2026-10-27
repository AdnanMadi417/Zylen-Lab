import React from "react";
import {
  MdAccessTime,
  MdArrowForward,
  MdBedtime,
  MdChildCare,
  MdDirectionsRun,
  MdEmail,
  MdFavorite,
  MdLocationOn,
  MdMenuBook,
  MdMusicNote,
  MdPalette,
  MdPhone,
  MdRestaurant,
  MdStar,
  MdTranslate,
  MdVerifiedUser,
  MdWavingHand,
  MdWbSunny,
} from "react-icons/md";
import StarRating from "components/ui/StarRating";
import BrowserChrome from "../../BrowserChrome";
import ClientLogo from "../../ClientLogo";
import { useClientName, useGuideT } from "../../../hooks/useUiTemplate";
import { BLOB, ImageSlot, Sparkle, Wave, tint, useAccents } from "./decor";
import SiteHeader from "./SiteHeader";

const STATS = ["1", "2", "3", "4"];
const CARDS = ["1", "2", "3"];
const FEATURES = [
  { n: "1", icon: MdFavorite },
  { n: "2", icon: MdTranslate },
  { n: "3", icon: MdVerifiedUser },
  { n: "4", icon: MdRestaurant },
];
const PROGRAMS = [
  { n: "1", icon: MdChildCare },
  { n: "2", icon: MdPalette },
  { n: "3", icon: MdMenuBook },
];
const DAY = [
  { n: "1", icon: MdWavingHand },
  { n: "2", icon: MdWbSunny },
  { n: "3", icon: MdMenuBook },
  { n: "4", icon: MdDirectionsRun },
  { n: "5", icon: MdBedtime },
  { n: "6", icon: MdMusicNote },
];
const FOOTER_COLS = [
  { key: "explore", links: ["home", "about", "programs"] },
  { key: "help", links: ["news", "contact"] },
];

const SectionHeader = ({ label, title, color, center = false }) => (
  <div className={center ? "text-center" : ""}>
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold"
      style={{ backgroundColor: tint(color), color }}
    >
      <MdStar className="h-3.5 w-3.5" />
      {label}
    </span>
    <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink md:text-4xl">{title}</h2>
  </div>
);

/**
 * A kindergarten homepage: warm, rounded and colourful, built from the
 * client's brand teal plus its four accents. Used instead of the generic
 * WebsitePreview for clients with `design: "kindergarten"`.
 * Copy: styleGuide.website.* plus the kindergarten keys under
 * uiTemplates.<id>.website (features, programmes, daily routine, hours).
 */
const KindergartenWebsite = ({ bare = false }) => {
  const t = useGuideT();
  const s = (k, o) => t(`styleGuide.website.${k}`, o);
  const clientName = useClientName();
  const [turquoise, yellow, red, orange] = useAccents();
  const accents = [turquoise, yellow, red, orange];

  return (
    <div className={bare ? "bg-white" : "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"}>
      {!bare && <BrowserChrome />}

      <SiteHeader />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-10 md:pb-24 md:pt-14" style={{ backgroundColor: tint(yellow, "14") }}>
        <Sparkle className="absolute top-8 h-5 w-5 ltr:left-[46%] rtl:right-[46%]" color={yellow} />
        <Sparkle className="absolute bottom-16 h-4 w-4 ltr:left-6 rtl:right-6" color={turquoise} />
        <div
          className="pointer-events-none absolute -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl ltr:-left-24 rtl:-right-24"
          style={{ backgroundColor: turquoise }}
        />

        <div className="relative grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-ink shadow-sm">
              <MdWbSunny className="h-4 w-4" style={{ color: yellow }} />
              {s("hero_badge")}
            </span>
            <h1 className="mt-5 font-display text-4xl font-black leading-[1.1] text-ink lg:text-[3.4rem]">
              {s("hero_title_lead")}{" "}
              <span className="relative inline-block text-brand-500">
                {s("hero_title_highlight")}
                {/* Crayon underline */}
                <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-2 left-0 h-3 w-full">
                  <path d="M2 9c40-6 80-8 120-5s58 3 76-1" fill="none" stroke={yellow} strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">{s("hero_subtitle")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-on-brand shadow-glow-brand">
                {s("hero_cta")} <MdArrowForward className="h-4 w-4 rtl:rotate-180" />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-brand-500/20 bg-white px-7 py-3 text-sm font-bold text-brand-700">
                {s("hero_cta2")}
              </span>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2.5 rtl:space-x-reverse">
                {accents.map((c, i) => (
                  <span key={i} className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-white" style={{ backgroundColor: c }}>
                    {["L", "O", "M", "S"][i]}
                  </span>
                ))}
              </div>
              <div>
                <StarRating value={5} size="h-4 w-4" />
                <p className="text-xs font-semibold text-slate-500">{s("hero_trust")}</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className={`absolute inset-3 rotate-6 ${BLOB}`} style={{ backgroundColor: turquoise }} />
            <ImageSlot className={`absolute inset-0 border-[6px] border-white shadow-xl ${BLOB}`} />
            <span
              className="absolute -top-2 flex -rotate-6 items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-black text-white shadow-lg ltr:-left-2 rtl:-right-2"
              style={{ backgroundColor: red }}
            >
              <MdChildCare className="h-4 w-4" /> {s("hero_sticker_age")}
            </span>
            <div className="absolute -bottom-3 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl ltr:-right-2 rtl:-left-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ backgroundColor: yellow }}>
                <MdFavorite className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-black leading-none text-ink">{s("stat_3_value")}</p>
                <p className="text-[11px] font-semibold text-slate-500">{s("stat_3_label")}</p>
              </div>
            </div>
            <span
              className="absolute top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg ltr:-right-4 rtl:-left-4"
              style={{ backgroundColor: yellow }}
            >
              <MdWbSunny className="h-8 w-8" />
            </span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 text-white">
          <Wave />
        </div>
      </section>

      {/* ── Why families choose us ── */}
      <section className="px-6 py-16">
        <SectionHeader label={s("features_label")} title={s("features_title")} color={red} center />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ n, icon: Icon }, i) => {
            const c = accents[i];
            return (
              <div key={n} className="rounded-[28px] p-6" style={{ backgroundColor: tint(c, "14") }}>
                <span className={`flex h-14 w-14 items-center justify-center text-white ${BLOB}`} style={{ backgroundColor: c }}>
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-lg font-black text-ink">{s(`feature_${n}_title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s(`feature_${n}_desc`)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Programmes ── */}
      <div className="text-brand-50">
        <Wave />
      </div>
      <section className="bg-brand-50 px-6 py-14">
        <SectionHeader label={s("programs_label")} title={s("programs_title")} color={turquoise} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map(({ n, icon: Icon }, i) => {
            const c = [turquoise, orange, red][i];
            return (
              <div key={n} className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-sm">
                <div className="relative flex h-28 items-center justify-center" style={{ backgroundColor: c }}>
                  <Icon className="h-12 w-12 text-white/90" />
                  <span className="absolute top-3 rounded-full bg-white px-3 py-1 text-xs font-black ltr:right-3 rtl:left-3" style={{ color: c }}>
                    {s(`program_${n}_age`)}
                  </span>
                  <div className="absolute inset-x-0 -bottom-px text-white">
                    <Wave />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-3">
                  <h3 className="font-display text-xl font-black text-ink">{s(`program_${n}_name`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s(`program_${n}_desc`)}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500" dir="ltr">
                      <MdAccessTime className="h-4 w-4" /> {s(`program_${n}_time`)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: c }}>
                      {s("programs_more")} <MdArrowForward className="h-4 w-4 rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="text-brand-50">
        <Wave flip />
      </div>

      {/* ── A day with us ── */}
      <section className="px-6 py-16">
        <SectionHeader label={s("day_label")} title={s("day_title")} color={orange} center />
        <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-6">
          {DAY.map(({ n, icon: Icon }, i) => {
            const c = accents[i % accents.length];
            return (
              <li key={n} className="flex flex-col items-center text-center">
                <span
                  className={`flex h-16 w-16 items-center justify-center ${BLOB}`}
                  style={{ backgroundColor: tint(c, "26"), color: c }}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <span className="mt-3 rounded-full px-2.5 py-0.5 text-xs font-black text-white" style={{ backgroundColor: c }} dir="ltr">
                  {s(`day_${n}_time`)}
                </span>
                <p className="mt-2 text-sm font-bold text-ink">{s(`day_${n}_title`)}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Stats ── */}
      <div className="text-brand-500">
        <Wave />
      </div>
      <section className="relative overflow-hidden bg-brand-500 px-6 py-12">
        <div className="pointer-events-none absolute inset-0 bg-dot-white bg-[size:28px_28px] opacity-10" />
        <div className="relative grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {STATS.map((n, i) => (
            <div key={n}>
              <MdStar className="mx-auto h-6 w-6" style={{ color: accents[(i + 1) % accents.length] }} />
              <p className="mt-1 font-display text-4xl font-black text-on-brand" dir="ltr">{s(`stat_${n}_value`)}</p>
              <p className="mt-1 text-sm font-semibold text-on-brand/75">{s(`stat_${n}_label`)}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="text-brand-500">
        <Wave flip />
      </div>

      {/* ── News & activities ── */}
      <section className="px-6 py-16">
        <SectionHeader label={s("cards_label")} title={s("cards_title")} color={turquoise} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((n, i) => {
            const c = [orange, turquoise, red][i];
            return (
              <div key={n} className="flex flex-col rounded-[28px] border-2 border-slate-100 bg-white p-3 transition-shadow hover:shadow-lg">
                <ImageSlot className="h-40 rounded-[20px]" color={c} />
                <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                  <span className="mb-2 self-start rounded-full px-3 py-0.5 text-xs font-bold" style={{ backgroundColor: tint(c), color: c }}>
                    {s(`card_${n}_cat`)}
                  </span>
                  <h3 className="mb-1.5 font-display text-lg font-black text-ink">{s(`card_${n}_title`)}</h3>
                  <p className="mb-3 text-sm text-slate-600">{s(`card_${n}_excerpt`)}</p>
                  <span className="mt-auto text-xs font-semibold text-slate-400" dir="ltr">{s(`card_${n}_date`)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="px-6 pb-16">
        <div className="relative mx-auto max-w-3xl">
          <div className="relative rounded-[32px] px-8 py-10 text-center md:px-14" style={{ backgroundColor: tint(yellow, "24") }}>
            <Sparkle className="absolute top-6 h-6 w-6 ltr:left-6 rtl:right-6" color={orange} />
            <Sparkle className="absolute bottom-8 h-4 w-4 ltr:right-8 rtl:left-8" color={turquoise} />
            <StarRating value={5} />
            <p className="mt-4 font-display text-xl font-bold leading-relaxed text-ink md:text-2xl">{s("quote")}</p>
            {/* Speech-bubble tail */}
            <span
              className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-sm"
              style={{ backgroundColor: tint(yellow, "24") }}
            />
          </div>
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full font-bold text-white" style={{ backgroundColor: red }}>
              {s("quote_name").charAt(0)}
            </span>
            <div className="text-start">
              <p className="text-sm font-black text-ink">{s("quote_name")}</p>
              <p className="text-xs text-slate-500">{s("quote_role")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call to action ── */}
      <section className="px-6 pb-16">
        <div className="relative overflow-hidden rounded-[36px] px-8 py-12 text-center md:py-16" style={{ backgroundColor: turquoise }}>
          <span className="absolute -top-10 h-36 w-36 rounded-full opacity-90 ltr:-left-10 rtl:-right-10" style={{ backgroundColor: yellow }} />
          <span className="absolute -bottom-12 h-40 w-40 rounded-full opacity-80 ltr:-right-8 rtl:-left-8" style={{ backgroundColor: orange }} />
          <Sparkle className="absolute top-8 h-6 w-6 text-white ltr:right-[18%] rtl:left-[18%]" />
          <div className="relative">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/80">{s("cta_label")}</span>
            <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-black leading-tight text-white md:text-4xl">{s("cta_title")}</h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/85">{s("cta_desc")}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-ink shadow-lg">
                {s("cta_btn")} <MdArrowForward className="h-4 w-4 rtl:rotate-180" />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-bold text-white">
                <MdPhone className="h-4 w-4" /> <span dir="ltr">{s("footer_phone")}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <div className="text-ink">
        <Wave />
      </div>
      <footer className="bg-ink px-6 pb-8 pt-10">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ClientLogo variant="onDark" className={`h-12 w-12 text-xl ${BLOB}`} />
              <p className="font-display text-xl font-black text-white">{clientName}</p>
            </div>
            <p className="max-w-[260px] text-sm leading-relaxed text-white/60">{s("footer_desc")}</p>
            <div className="flex gap-1.5" aria-hidden="true">
              {accents.map((c, i) => (
                <span key={i} className="h-2 w-8 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.key}>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.15em]" style={{ color: yellow }}>{s(`footer_${col.key}`)}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l} className="text-sm text-white/60">{s(`nav_${l}`)}</li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.15em]" style={{ color: yellow }}>{s("hours_title")}</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              <li className="flex items-center gap-2.5"><MdAccessTime className="h-4 w-4 shrink-0 text-white/40" />{s("hours")}</li>
              <li className="flex items-center gap-2.5"><MdLocationOn className="h-4 w-4 shrink-0 text-white/40" />{s("footer_address")}</li>
              <li className="flex items-center gap-2.5"><MdEmail className="h-4 w-4 shrink-0 text-white/40" /><span dir="ltr">{s("footer_email")}</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          {s("footer_copy", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default KindergartenWebsite;
