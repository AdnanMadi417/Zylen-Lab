import React from "react";
import {
  MdBedtime,
  MdChat,
  MdCheck,
  MdCheckCircle,
  MdChevronRight,
  MdEventBusy,
  MdLogin,
  MdPayments,
  MdPersonAdd,
  MdRestaurant,
  MdSentimentSatisfied,
  MdWarning,
} from "react-icons/md";
import BrowserChrome from "../../BrowserChrome";
import { useGuideT } from "../../../hooks/useUiTemplate";
import { BLOB, ImageSlot, Sparkle, Wave, tint, useAccents } from "./decor";
import SiteHeader from "./SiteHeader";

const GLANCE = [
  { n: "1", icon: MdCheckCircle },
  { n: "2", icon: MdSentimentSatisfied },
  { n: "3", icon: MdRestaurant },
  { n: "4", icon: MdBedtime },
];
// Daily routine from the website (day_1…day_6); the first three are done.
const DAY = ["1", "2", "3", "4", "5", "6"];
const NOW = 3;
const SKILLS = [
  { n: "1", value: 80 },
  { n: "2", value: 65 },
  { n: "3", value: 90 },
  { n: "4", value: 72 },
];
const MESSAGES = ["1", "2"];
const EVENTS = ["1", "2", "3"];
const ACTIONS = [
  { n: "1", icon: MdEventBusy },
  { n: "2", icon: MdChat },
  { n: "3", icon: MdPersonAdd },
  { n: "4", icon: MdPayments },
];

const Panel = ({ title, action, children, className = "" }) => (
  <section className={`rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100 ${className}`}>
    {(title || action) && (
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-black text-ink">{title}</h2>
        {action && (
          <span className="inline-flex items-center gap-0.5 text-sm font-bold text-brand-600">
            {action} <MdChevronRight className="h-4 w-4 rtl:rotate-180" />
          </span>
        )}
      </div>
    )}
    {children}
  </section>
);

/**
 * The parent's "My child" overview, a signed-in page of the kindergarten
 * website: the child's profile, today at a glance, the day's timeline,
 * photos, learning progress, teacher messages, upcoming events, quick
 * actions and fees.
 * Copy: styleGuide.overview.* (defined under uiTemplates.<id>.overview) plus
 * the website's daily routine (styleGuide.website.day_*).
 */
const KindergartenUserOverview = ({ bare = false }) => {
  const t = useGuideT();
  const s = (k, o) => t(`styleGuide.overview.${k}`, o);
  const w = (k, o) => t(`styleGuide.website.${k}`, o);
  const [turquoise, yellow, red, orange] = useAccents();
  const accents = [turquoise, yellow, red, orange];

  return (
    <div className={bare ? "min-h-screen bg-slate-50" : "overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"}>
      {!bare && <BrowserChrome path="/parents/overview" />}
      <div className="bg-white">
        <SiteHeader active="" user={{ name: s("user_name"), initial: s("user_initial") }} />
      </div>

      {/* ── Greeting ── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-8" style={{ backgroundColor: tint(yellow, "1F") }}>
        <Sparkle className="absolute top-6 h-5 w-5 ltr:right-[30%] rtl:left-[30%]" color={orange} />
        <Sparkle className="absolute bottom-12 hidden h-4 w-4 ltr:left-[40%] rtl:right-[40%] md:block" color={turquoise} />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">{s("date")}</p>
            <h1 className="mt-1 font-display text-3xl font-black text-ink md:text-4xl">
              {s("greeting", { name: s("user_name") })}
            </h1>
            <p className="mt-1 text-slate-600">{s("subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">{s("children_label")}</span>
            {["1", "2"].map((n, i) => (
              <span
                key={n}
                className={`flex items-center gap-2 rounded-full bg-white py-1 text-sm font-bold ltr:pl-1 ltr:pr-3.5 rtl:pl-3.5 rtl:pr-1 ${
                  i === 0 ? "text-ink shadow-md ring-2" : "text-slate-500 ring-1 ring-slate-200"
                }`}
                style={i === 0 ? { "--tw-ring-color": orange } : undefined}
              >
                <span className={`flex h-7 w-7 items-center justify-center text-xs text-white ${BLOB}`} style={{ backgroundColor: [turquoise, red][i] }}>
                  {s(`child_${n}`).charAt(0)}
                </span>
                {s(`child_${n}`)}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 text-slate-50">
          <Wave />
        </div>
      </section>

      <div className="grid gap-6 px-6 pb-14 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          {/* ── Child profile ── */}
          <Panel>
            <div className="flex flex-wrap items-center gap-5">
              <div className="relative">
                <span className={`flex h-20 w-20 items-center justify-center font-display text-3xl font-black text-white ${BLOB}`} style={{ backgroundColor: turquoise }}>
                  {s("child_name").charAt(0)}
                </span>
                <span className="absolute -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow ltr:-right-1 rtl:-left-1" style={{ color: yellow }}>
                  ★
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl font-black text-ink">{s("child_name")}</h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: orange }}>
                    {s("child_class")}
                  </span>
                  <span>{s("child_age")}</span>
                  <span>
                    {s("teacher_label")}: <span className="font-semibold text-ink">{s("teacher")}</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green/10 px-3 py-1.5 text-xs font-bold text-green">
                  <MdLogin className="h-4 w-4 rtl:rotate-180" /> {s("status")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold" style={{ backgroundColor: tint(red), color: red }}>
                  <MdWarning className="h-4 w-4" /> {s("allergy")}
                </span>
              </div>
            </div>
          </Panel>

          {/* ── Today at a glance ── */}
          <div>
            <h2 className="mb-3 font-display text-lg font-black text-ink">{s("glance_title")}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {GLANCE.map(({ n, icon: Icon }, i) => {
                const c = accents[i];
                return (
                  <div key={n} className="rounded-[24px] p-4" style={{ backgroundColor: tint(c, "1F") }}>
                    <span className={`flex h-10 w-10 items-center justify-center text-white ${BLOB}`} style={{ backgroundColor: c }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-xs font-semibold text-slate-500">{s(`glance_${n}_label`)}</p>
                    <p className="font-display text-lg font-black text-ink">{s(`glance_${n}_value`)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Today's timeline ── */}
          <Panel title={s("timeline_title")}>
            <ol className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {DAY.map((n, i) => {
                const state = i < NOW ? "done" : i === NOW ? "now" : "next";
                const c = state === "done" ? turquoise : state === "now" ? orange : null;
                return (
                  <li
                    key={n}
                    className={`flex items-center gap-3 rounded-2xl p-3 sm:flex-col sm:items-start ${state === "next" ? "bg-slate-50" : ""}`}
                    style={c ? { backgroundColor: tint(c, "1A") } : undefined}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white ${state === "next" ? "bg-slate-200" : ""} ${state === "now" ? "animate-pulse" : ""}`}
                      style={c ? { backgroundColor: c } : undefined}
                    >
                      {state === "done" ? <MdCheck className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-400" dir="ltr">{w(`day_${n}_time`)}</p>
                      <p className={`text-sm font-bold ${state === "next" ? "text-slate-500" : "text-ink"}`}>{w(`day_${n}_title`)}</p>
                      <p className="text-[11px] font-semibold" style={{ color: c ?? undefined }}>
                        {state !== "next" && s(`status_${state}`)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Panel>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* ── Photos ── */}
            <Panel title={s("photos_title")} action={s("view_all")}>
              <div className="grid grid-cols-3 gap-3">
                {[orange, turquoise, yellow, red, turquoise, orange].map((c, i) => (
                  <div key={i} className="relative">
                    <ImageSlot className="aspect-square rounded-2xl" color={c} />
                    {i === 5 && (
                      <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-ink/60 font-display text-lg font-black text-white" dir="ltr">
                        +8
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-500">{s("photos_count")}</p>
            </Panel>

            {/* ── Learning progress ── */}
            <Panel title={s("progress_title")} action={s("progress_term")}>
              <ul className="flex flex-col gap-4">
                {SKILLS.map(({ n, value }, i) => {
                  const c = accents[i];
                  return (
                    <li key={n}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-bold text-ink">{s(`skill_${n}`)}</span>
                        <span className="text-xs font-semibold text-slate-500">{s(`skill_${n}_level`)}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: c }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          {/* ── Messages ── */}
          <Panel title={s("messages_title")} action={s("view_all")}>
            <ul className="flex flex-col gap-3">
              {MESSAGES.map((n, i) => (
                <li key={n} className={`rounded-2xl p-3.5 ${i === 0 ? "" : "bg-slate-50"}`} style={i === 0 ? { backgroundColor: tint(turquoise, "1A") } : undefined}>
                  <div className="flex items-center gap-2.5">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center text-sm font-bold text-white ${BLOB}`} style={{ backgroundColor: i === 0 ? turquoise : orange }}>
                      {s(`msg_${n}_from`).charAt(0)}
                    </span>
                    <p className="min-w-0 flex-1 truncate text-sm font-bold text-ink">{s(`msg_${n}_from`)}</p>
                    <span className="text-[11px] text-slate-400">{s(`msg_${n}_time`)}</span>
                    {i === 0 && <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: red }} />}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s(`msg_${n}_text`)}</p>
                </li>
              ))}
            </ul>
            <span className="mt-4 flex h-11 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-on-brand">
              {s("reply")}
            </span>
          </Panel>

          {/* ── Coming up ── */}
          <Panel title={s("events_title")}>
            <ul className="flex flex-col gap-3">
              {EVENTS.map((n, i) => {
                const c = [orange, turquoise, red][i];
                return (
                  <li key={n} className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl text-white" style={{ backgroundColor: c }}>
                      <span className="text-base font-black leading-none">{s(`event_${n}_day`)}</span>
                      <span className="text-[10px] font-bold uppercase">{s(`event_${n}_month`)}</span>
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-ink">{s(`event_${n}_title`)}</p>
                      <p className="text-xs text-slate-500" dir="ltr">{s(`event_${n}_time`)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          {/* ── Quick actions ── */}
          <Panel title={s("actions_title")}>
            <div className="grid grid-cols-2 gap-3">
              {ACTIONS.map(({ n, icon: Icon }, i) => {
                const c = accents[i];
                return (
                  <span key={n} className="flex flex-col items-center gap-2 rounded-2xl p-3 text-center ring-1 ring-slate-100">
                    <span className={`flex h-10 w-10 items-center justify-center ${BLOB}`} style={{ backgroundColor: tint(c, "26"), color: c }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold text-ink">{s(`action_${n}`)}</span>
                  </span>
                );
              })}
            </div>
          </Panel>

          {/* ── Fees ── */}
          <div className="relative overflow-hidden rounded-[28px] p-6" style={{ backgroundColor: orange }}>
            <span className="absolute -top-8 h-24 w-24 rounded-full opacity-40 ltr:-right-6 rtl:-left-6" style={{ backgroundColor: yellow }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">{s("fee_title")}</p>
              <p className="mt-1 font-display text-xl font-black text-white">{s("fee_due")}</p>
              <span className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-black text-ink">{s("fee_btn")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="text-ink">
        <Wave />
      </div>
      <footer className="bg-ink px-6 py-6 text-xs text-white/50">{w("footer_copy", { year: new Date().getFullYear() })}</footer>
    </div>
  );
};

export default KindergartenUserOverview;
