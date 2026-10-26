import React, { useState } from "react";
import { MdArrowBack, MdEmail, MdLockReset, MdMarkEmailRead } from "react-icons/md";
import { InputField } from "components/form";
import Button from "components/ui/buttons/Button";
import { useGuideT } from "../../hooks/useUiTemplate";
import useDemoForm from "../../hooks/useDemoForm";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";
import AuthPreview, { AuthCard } from "../AuthPreview";

const BackLink = ({ children }) => (
  <span className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400">
    <MdArrowBack className="h-4 w-4 rtl:rotate-180" /> {children}
  </span>
);

const IconTile = ({ Icon, tone }) => (
  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
    <Icon className="h-6 w-6" />
  </div>
);

/** Verification code step (views/auth/SignIn.jsx, OtpStep). */
const OtpCard = () => {
  const t = useGuideT();
  const [code, setCode] = useState("482");
  return (
    <AuthCard>
      <BackLink>{t("auth.back")}</BackLink>
      <IconTile Icon={MdEmail} tone="bg-brand-500/10 text-brand-800" />
      <h1 className="mt-4 text-2xl font-bold text-navy-700">{t("auth.verify_identity")}</h1>
      <p className="mt-1 text-sm text-slate-400">
        {t("auth.otp_sent_via")} <span className="font-semibold text-slate-600">email</span> {t("auth.otp_sent_to")}{" "}
        <span className="font-semibold text-slate-600">you@example.com</span>
      </p>
      <label className="mb-1.5 mt-6 block text-xs font-semibold text-slate-700">{t("auth.six_digit_code")}</label>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="——————"
        dir="ltr"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-2xl font-bold tracking-[0.6em] text-slate-900 outline-none transition-all duration-200 placeholder:text-base placeholder:font-normal placeholder:tracking-normal focus:border-brand-700 focus:bg-white"
      />
      <p className="mt-1.5 text-center text-xs text-slate-400">{code.length}/6 {t("auth.digits_entered")}</p>
      <Button text={t("auth.verify_sign_in")} disabled={code.length < 6} className="mt-4 h-12 w-full" />
    </AuthCard>
  );
};

/** Forgot-password form (views/auth/ForgotPassword.jsx). */
const ForgotCard = () => {
  const t = useGuideT();
  const form = useDemoForm({ email: "" });
  return (
    <AuthCard>
      <BackLink>{t("auth.back_to_sign_in")}</BackLink>
      <IconTile Icon={MdLockReset} tone="bg-amber-50 text-amber-500" />
      <h1 className="mt-4 text-2xl font-bold text-navy-700">{t("auth.forgot_title")}</h1>
      <p className="mb-6 mt-1 text-sm text-slate-400">{t("auth.forgot_subtitle")}</p>
      <InputField label={t("auth.email_address")} field="email" type="email" placeholder="you@example.com" {...form} />
      <Button text={t("auth.send_reset_link")} className="mt-4 h-12 w-full" />
    </AuthCard>
  );
};

/** Reset link sent (views/auth/ForgotPassword.jsx, sent state). */
const SentCard = () => {
  const t = useGuideT();
  return (
    <AuthCard>
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green">
          <MdMarkEmailRead className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-xl font-bold text-navy-700">{t("auth.check_email_title")}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {t("auth.check_email_body")} <span className="font-semibold text-slate-700">you@example.com</span>.{" "}
          {t("auth.check_email_body2")}
        </p>
        <Button text={t("auth.enter_reset_token")} className="mt-7 h-11 w-full" />
        <p className="mt-3 text-sm text-slate-400">{t("auth.use_different_email")}</p>
      </div>
    </AuthCard>
  );
};

const AuthSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.auth.${k}`);

  return (
    <GuideSection id="auth" title={s("title")} intro={s("intro")}>
      <ComponentShowcase title={s("signin_name")} description={s("signin_desc")} canvas="muted">
        <AuthPreview />
      </ComponentShowcase>

      <ComponentShowcase title={s("steps_name")} description={s("steps_desc")} canvas="muted">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { key: "otp", Card: OtpCard },
            { key: "forgot", Card: ForgotCard },
            { key: "sent", Card: SentCard },
          ].map(({ key, Card }) => (
            <div key={key}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{s(`${key}_name`)}</p>
              <Card />
            </div>
          ))}
        </div>
      </ComponentShowcase>
    </GuideSection>
  );
};

export default AuthSection;
