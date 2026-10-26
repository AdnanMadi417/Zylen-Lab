import React, { useState } from "react";
import { useGuideT } from "../../hooks/useUiTemplate";
import { MdCheck, MdDelete, MdEvent, MdMailOutline, MdOpenInNew } from "react-icons/md";
import Modal from "components/ui/modals/Modal";
import ConfirmModal from "components/ui/modals/ConfirmModal";
import Button from "components/ui/buttons/Button";
import { InputField, TextareaField } from "components/form";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";
import useDemoForm from "../../hooks/useDemoForm";

const IconTile = ({ children, tone = "brand" }) => (
  <span
    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
      tone === "danger" ? "bg-red-50 text-red-600" : "bg-brand-500/10 text-brand-800"
    }`}
  >
    {children}
  </span>
);

/** Dimmed page mock with the popup design in the middle, plus a live trigger. */
const PopupStage = ({ onOpen, children }) => {
  const t = useGuideT();
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100 p-6">
        <div className="absolute inset-0 flex flex-col gap-3 p-5" aria-hidden="true">
          <div className="h-3 w-1/3 rounded-full bg-slate-200" />
          <div className="h-3 w-2/3 rounded-full bg-slate-200" />
          <div className="h-24 rounded-xl bg-slate-200" />
          <div className="h-3 w-1/2 rounded-full bg-slate-200" />
        </div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" />
        <div className="relative flex w-full justify-center">{children}</div>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-brand-800 hover:underline print:hidden"
      >
        <MdOpenInNew className="h-3.5 w-3.5" /> {t("styleGuide.popups.open_live")}
      </button>
    </div>
  );
};

const PopupsSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.popups.${k}`);
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);
  const form = useDemoForm({ name: "", email: "", message: "" });

  // Each popup is defined once and rendered twice: inline as the design, and
  // as the real overlay when "Open live" is clicked.
  const dialog = (props) => (
    <Modal
      {...props}
      title={s("dialog_title")}
      subtitle={s("dialog_subtitle")}
      icon={<IconTile><MdEvent className="h-5 w-5" /></IconTile>}
      footer={
        <div className="flex justify-end gap-2">
          <Button text={t("common.cancel")} variant="ghost" onClick={close} />
          <Button text={s("dialog_cta")} onClick={close} />
        </div>
      }
    >
      <p className="text-sm leading-relaxed text-slate-500">{s("dialog_body")}</p>
    </Modal>
  );

  const confirm = (props) => (
    <ConfirmModal
      {...props}
      onConfirm={close}
      icon={<IconTile tone="danger"><MdDelete className="h-5 w-5" /></IconTile>}
      title={s("confirm_title")}
      message={s("confirm_body")}
      confirmText={s("confirm_cta")}
    />
  );

  const success = (props) => (
    <Modal {...props} size="sm">
      <div className="flex flex-col items-center px-2 pb-2 pt-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green">
          <MdCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-base font-bold text-slate-900">{s("success_title")}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s("success_body")}</p>
        <div className="mt-5 w-full">
          <Button text={s("success_cta")} onClick={close} className="w-full" />
        </div>
      </div>
    </Modal>
  );

  const formPopup = (props) => (
    <Modal
      {...props}
      title={s("form_title")}
      subtitle={s("form_subtitle")}
      icon={<IconTile><MdMailOutline className="h-5 w-5" /></IconTile>}
      footer={
        <div className="flex justify-end gap-2">
          <Button text={t("common.cancel")} variant="ghost" onClick={close} />
          <Button text={s("form_cta")} onClick={close} />
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <InputField label={s("form_name_label")} field="name" {...form} />
        <InputField label={s("form_email_label")} field="email" type="email" {...form} />
        <TextareaField label={s("form_message_label")} field="message" {...form} />
      </div>
    </Modal>
  );

  const POPUPS = [
    {
      key: "dialog",
      title: "Modal",
      render: dialog,
      code: `
<Modal
  open={open}
  onClose={close}
  title="Confirm your booking"
  subtitle="Saturday, 14 March · 10:00"
  icon={<MdEvent />}
  footer={<Button text="Confirm booking" onClick={confirm} />}
>
  …
</Modal>`,
    },
    {
      key: "confirm",
      title: "ConfirmModal",
      render: confirm,
      code: `
<ConfirmModal
  open={open}
  onClose={close}
  onConfirm={remove}
  title="Delete this item?"
  message="This action cannot be undone."
  confirmText="Delete"
/>`,
    },
    {
      key: "success",
      title: "Modal · success",
      render: success,
      code: `
<Modal open={open} onClose={close} size="sm">
  {/* check icon, title, message, one full-width button */}
</Modal>`,
    },
    {
      key: "form",
      title: "Modal · form",
      render: formPopup,
      code: `
<Modal open={open} onClose={close} title="Send us a message" footer={…}>
  <InputField label="Full name" field="name" {...form} />
  <InputField label="Email" field="email" type="email" {...form} />
  <TextareaField label="Message" field="message" {...form} />
</Modal>`,
    },
  ];

  return (
    <GuideSection id="popups" title={s("title")} intro={s("intro")}>
      <div className="grid gap-8 lg:grid-cols-2">
        {POPUPS.map(({ key, title, render, code }) => (
          <ComponentShowcase key={key} title={`${s(`${key}_name`)} · ${title}`} description={s(`${key}_desc`)} code={code}>
            <PopupStage onOpen={() => setOpen(key)}>{render({ inline: true, onClose: close })}</PopupStage>
          </ComponentShowcase>
        ))}
      </div>

      {POPUPS.map(({ key, render }) => (
        <React.Fragment key={key}>{render({ open: open === key, onClose: close })}</React.Fragment>
      ))}
    </GuideSection>
  );
};

export default PopupsSection;
