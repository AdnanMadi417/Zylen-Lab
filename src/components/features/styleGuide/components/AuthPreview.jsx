import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import { InputField, PasswordField } from "components/form";
import Checkbox from "components/checkbox";
import Button from "components/ui/buttons/Button";
import ClientLogo from "./ClientLogo";
import useDemoForm from "../hooks/useDemoForm";
import { useClientName, useGuideT } from "../hooks/useUiTemplate";

/** Form card used by every auth screen (mirrors views/auth/*). */
export const AuthCard = ({ children }) => (
  <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">{children}</div>
);

/** The sign-in form itself, with live fields (views/auth/SignIn.jsx, LoginStep). */
export const SignInForm = () => {
  const t = useGuideT();
  const clientName = useClientName();
  const form = useDemoForm({ email: "", password: "" });
  const [remember, setRemember] = useState(true);

  return (
    <AuthCard>
      <div className="mb-7">
        <span className="inline-block rounded-full bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-800">
          {t("auth.portal_access")}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-navy-700">{t("auth.welcome_back")}</h1>
        <p className="mt-1 text-sm text-slate-400">{t("styleGuide.auth.sign_in_subtitle", { client: clientName })}</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()} noValidate className="flex flex-col gap-1">
        <InputField label={t("auth.email_address")} field="email" type="email" placeholder="you@example.com" {...form} />
        <PasswordField label={t("auth.password")} field="password" placeholder={t("auth.password_placeholder")} {...form} />
        <div className="mb-5 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox color="brand" checked={remember} onChange={(e) => setRemember(e.target.checked)} extra="cursor-pointer" />
            <span className="text-sm text-slate-600">{t("auth.remember_me")}</span>
          </label>
          <span className="text-sm font-medium text-brand-800">{t("auth.forgot_password")}</span>
        </div>
        <Button type="submit" text={t("auth.sign_in")} className="h-12 w-full" />
      </form>
      <p className="mt-6 text-center text-sm text-slate-400">
        {t("auth.no_account")} <span className="font-medium text-brand-800">{t("auth.create_one")}</span>
      </p>
    </AuthCard>
  );
};

/**
 * Full sign-in screen in the client's branding: brand panel + form panel,
 * mirroring layouts/auth (whose panel hardcodes Haluan's logo and copy).
 * `bare` drops the browser chrome (used in the phone frames).
 */
const AuthPreview = ({ bare = false }) => {
  const t = useGuideT();
  const clientName = useClientName();

  const screen = (
    <div className="relative flex min-h-[640px] bg-slate-50">
      {/* ── Brand panel ── */}
      <div className="relative hidden flex-col items-center justify-between bg-ink px-10 py-14 lg:flex lg:w-[42%] ltr:rounded-br-[100px] rtl:rounded-bl-[100px]">
        <div className="absolute inset-0 overflow-hidden ltr:rounded-br-[100px] rtl:rounded-bl-[100px]">
          <div className="absolute inset-0 bg-auth-grid bg-[size:40px_40px] opacity-[0.06]" />
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-[80px]" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-brand-500/20 blur-[80px]" />
        </div>
        <span className="relative z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/70">
          {t("styleGuide.auth.panel_badge")}
        </span>
        <div className="relative z-10 flex flex-col items-center text-center">
          <ClientLogo variant="onDark" className="mb-7 h-36 w-36 rounded-3xl text-6xl shadow-2xl ring-1 ring-white/15" />
          <p className="text-xl font-bold leading-snug text-white">{clientName}</p>
          <div className="my-6 h-px w-10 bg-white/30" />
          <p className="max-w-[260px] text-sm leading-relaxed text-white/80">{t("styleGuide.auth.panel_tagline")}</p>
        </div>
        <span className="relative z-10 text-xs text-white/40">{t("styleGuide.auth.panel_version", { client: clientName })}</span>
      </div>

      {/* ── Form panel ── */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[58%]">
        <div className="mb-8 flex flex-col items-center lg:hidden">
          <ClientLogo variant="icon" className="h-16 w-16 rounded-2xl text-2xl" />
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-navy-700">{clientName}</p>
        </div>
        <div className="w-full max-w-[420px]">
          <SignInForm />
        </div>
      </div>
    </div>
  );

  if (bare) return screen;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5" aria-hidden="true">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-200" dir="ltr">
          <MdLock className="h-3 w-3 shrink-0" />
          <span className="truncate">{t("styleGuide.website.url")}/auth/sign-in</span>
        </div>
      </div>
      {screen}
    </div>
  );
};

export default AuthPreview;
