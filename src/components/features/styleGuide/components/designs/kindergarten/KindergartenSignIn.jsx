import React, { useState } from "react";
import { MdArrowForward, MdChat, MdEventAvailable, MdPhotoCamera, MdSupportAgent, MdWavingHand, MdWbSunny } from "react-icons/md";
import { InputField, PasswordField } from "components/form";
import Checkbox from "components/checkbox";
import Button from "components/ui/buttons/Button";
import BrowserChrome from "../../BrowserChrome";
import ClientLogo from "../../ClientLogo";
import useDemoForm from "../../../hooks/useDemoForm";
import { useClientName, useGuideT } from "../../../hooks/useUiTemplate";
import { BLOB, Sparkle, Wave, tint, useAccents } from "./decor";

const FEATURES = [
  { n: "1", icon: MdPhotoCamera },
  { n: "2", icon: MdChat },
  { n: "3", icon: MdEventAvailable },
];

/** Three-band rainbow drawn with bordered half-circles. */
const Rainbow = ({ colors }) => (
  <div className="relative h-24 w-48" aria-hidden="true">
    {colors.map((c, i) => (
      <span
        key={i}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full border-[12px] border-b-0"
        style={{ borderColor: c, width: 192 - i * 48, height: 96 - i * 24 }}
      />
    ))}
  </div>
);

/** Toy letter blocks (copy: auth.blocks, comma-separated). */
const Blocks = ({ letters, colors }) => (
  <div className="flex items-end gap-2" aria-hidden="true">
    {letters.map((l, i) => (
      <span
        key={i}
        className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-2xl font-black text-white shadow-lg ${
          ["-rotate-6", "rotate-3 -translate-y-3", "-rotate-3"][i % 3]
        }`}
        style={{ backgroundColor: colors[i % colors.length], boxShadow: "inset 0 -5px 0 rgb(0 0 0 / 0.15)" }}
      >
        {l}
      </span>
    ))}
  </div>
);

/**
 * Parent-portal sign-in for a kindergarten: an illustrated teal panel
 * (rainbow, toy blocks, what parents get) beside a rounded, colourful form
 * card on a warm background. Used instead of the generic AuthPreview for
 * clients with `design: "kindergarten"`.
 * Copy: auth.* (shared form strings) plus styleGuide.auth.* with the
 * kindergarten keys under uiTemplates.<id>.auth (panel_title, features, help).
 */
const KindergartenSignIn = ({ bare = false }) => {
  const t = useGuideT();
  const s = (k, o) => t(`styleGuide.auth.${k}`, o);
  const clientName = useClientName();
  const [turquoise, yellow, red, orange] = useAccents();
  const form = useDemoForm({ email: "", password: "" });
  const [remember, setRemember] = useState(true);

  const screen = (
    <div className={`relative flex ${bare ? "min-h-screen" : "min-h-[680px]"}`} style={{ backgroundColor: tint(yellow, "14") }}>
      {/* ── Illustrated panel ── */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-brand-500 px-10 py-10 lg:flex lg:w-[46%]">
        <div className="pointer-events-none absolute inset-0 bg-dot-white bg-[size:28px_28px] opacity-10" />
        <span className="absolute -top-16 h-56 w-56 rounded-full opacity-30 blur-2xl ltr:-right-16 rtl:-left-16" style={{ backgroundColor: turquoise }} />

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ClientLogo variant="onDark" className={`h-11 w-11 text-lg ring-2 ring-white/20 ${BLOB}`} />
            <p className="font-display text-lg font-black text-white">{clientName}</p>
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">{s("panel_badge")}</span>
        </div>

        <div className="relative flex flex-col items-center py-8">
          <span className="absolute top-2 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ltr:right-6 rtl:left-6" style={{ backgroundColor: yellow }}>
            <MdWbSunny className="h-8 w-8" />
          </span>
          <span className="absolute top-12 h-6 w-16 rounded-full bg-white/80 ltr:left-4 rtl:right-4" aria-hidden="true" />
          <span className="absolute top-9 h-6 w-10 rounded-full bg-white/80 ltr:left-10 rtl:right-10" aria-hidden="true" />
          <Rainbow colors={[red, orange, yellow]} />
          <div className="-mt-3">
            <Blocks letters={s("blocks").split(",")} colors={[turquoise, red, orange]} />
          </div>
        </div>

        <div className="relative">
          <h2 className="max-w-sm font-display text-3xl font-black leading-tight text-white">{s("panel_title")}</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">{s("panel_tagline")}</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {FEATURES.map(({ n, icon: Icon }, i) => {
              const c = [yellow, turquoise, orange][i];
              return (
                <li key={n} className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-2.5 text-sm font-semibold text-white">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center text-white ${BLOB}`} style={{ backgroundColor: c }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  {s(`feature_${n}`)}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Grass */}
        <div className="absolute inset-x-0 bottom-0" style={{ color: turquoise }}>
          <Wave className="opacity-60" />
        </div>
      </div>

      {/* ── Form side ── */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[54%]">
        <Sparkle className="absolute top-10 h-5 w-5 ltr:right-[12%] rtl:left-[12%]" color={orange} />
        <Sparkle className="absolute bottom-14 hidden h-4 w-4 ltr:left-[10%] rtl:right-[10%] lg:block" color={turquoise} />
        <span className="absolute bottom-24 hidden h-3 w-3 rounded-full ltr:right-[16%] rtl:left-[16%] lg:block" style={{ backgroundColor: red }} aria-hidden="true" />

        {/* Phones: logo and accent dots above the card instead of the panel */}
        <div className="mb-7 flex flex-col items-center lg:hidden">
          <ClientLogo variant="icon" className={`h-16 w-16 text-2xl ${BLOB}`} />
          <p className="mt-3 font-display text-lg font-black text-ink">{clientName}</p>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            {[turquoise, yellow, red, orange].map((c, i) => (
              <span key={i} className="h-1.5 w-6 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-[420px] rounded-[32px] bg-white p-8 shadow-xl shadow-brand-900/5 ring-1 ring-slate-100">
          {/* Crayon stripe */}
          <div className="absolute inset-x-10 top-0 flex h-1.5 overflow-hidden rounded-b-full" aria-hidden="true">
            {[turquoise, yellow, red, orange].map((c, i) => (
              <span key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          <div className="mb-7">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: tint(yellow, "26"), color: orange }}
            >
              <MdWavingHand className="h-4 w-4" />
              {s("panel_badge")}
            </span>
            <h1 className="mt-3 font-display text-3xl font-black text-ink">{t("auth.welcome_back")}</h1>
            <p className="mt-1 text-sm text-slate-500">{s("sign_in_subtitle", { client: clientName })}</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} noValidate className="flex flex-col gap-1">
            <InputField label={t("auth.email_address")} field="email" type="email" placeholder="you@example.com" {...form} />
            <PasswordField label={t("auth.password")} field="password" placeholder={t("auth.password_placeholder")} {...form} />
            <div className="mb-5 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox color="brand" checked={remember} onChange={(e) => setRemember(e.target.checked)} extra="cursor-pointer" />
                <span className="text-sm text-slate-600">{t("auth.remember_me")}</span>
              </label>
              <span className="text-sm font-bold" style={{ color: orange }}>{t("auth.forgot_password")}</span>
            </div>
            <Button
              type="submit"
              text={t("auth.sign_in")}
              icon={<MdArrowForward className="h-4 w-4 rtl:rotate-180" />}
              iconPosition="right"
              className="h-12 w-full font-bold shadow-glow-brand"
            />
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {t("auth.no_account")} <span className="font-bold text-brand-600">{t("auth.create_one")}</span>
          </p>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <MdSupportAgent className="h-5 w-5 shrink-0" style={{ color: turquoise }} />
          <span>
            {s("help")} <span className="inline-block whitespace-nowrap font-bold text-ink" dir="ltr">{t("styleGuide.website.footer_phone")}</span>
          </span>
        </p>
      </div>
    </div>
  );

  if (bare) return screen;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <BrowserChrome path="/auth/sign-in" />
      {screen}
    </div>
  );
};

export default KindergartenSignIn;
