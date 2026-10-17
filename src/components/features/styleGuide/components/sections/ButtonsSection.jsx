import React from "react";
import { useTranslation } from "react-i18next";
import { MdAdd, MdEdit, MdDelete, MdDownload, MdVisibility, MdSave } from "react-icons/md";
import Button from "components/ui/buttons/Button";
import NextButton from "components/ui/buttons/NextButton";
import PrevButton from "components/ui/buttons/PrevButton";
import CancelButton from "components/ui/buttons/CancelButton";
import DangerButton from "components/ui/buttons/DangerButton";
import IconButton from "components/ui/buttons/IconButton";
import RowIconButton from "components/ui/buttons/RowIconButton";
import DropdownButton from "components/ui/buttons/DropdownButton";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";

const StateLabel = ({ children }) => (
  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{children}</p>
);

const ButtonsSection = () => {
  const { t } = useTranslation();
  const s = (k) => t(`styleGuide.buttons.${k}`);

  return (
    <GuideSection id="buttons" title={s("title")} intro={s("intro")}>
      <ComponentShowcase
        title="Button"
        description={s("button_desc")}
        code={`
import Button from "components/ui/buttons/Button";

<Button text="Save changes" icon={<MdSave />} />
<Button text="Save changes" variant="secondary" />
<Button text="Save changes" loading />`}
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <StateLabel>{s("variants")}</StateLabel>
            <div className="flex flex-wrap gap-3">
              <Button text={s("sample_primary")} icon={<MdSave className="h-4 w-4" />} />
              <Button text={s("sample_secondary")} variant="secondary" />
              <Button text={s("sample_ghost")} variant="ghost" />
              <Button text={s("sample_danger")} variant="danger" icon={<MdDelete className="h-4 w-4" />} />
            </div>
          </div>
          <div>
            <StateLabel>{s("states")}</StateLabel>
            <div className="flex flex-wrap gap-3">
              <Button text={s("state_loading")} loading />
              <Button text={s("state_disabled")} disabled />
              <Button text={s("state_icon_right")} icon={<MdDownload className="h-4 w-4" />} iconPosition="right" variant="secondary" />
            </div>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="NextButton · PrevButton · CancelButton · DangerButton"
        description={s("flow_desc")}
        code={`
<PrevButton onClick={goBack} />
<NextButton onClick={goNext} loading={saving} />
<CancelButton onClick={close} />
<DangerButton onClick={remove} />`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-slate-200 p-4">
          <PrevButton />
          <div className="flex flex-wrap gap-3">
            <CancelButton />
            <DangerButton icon={<MdDelete className="h-4 w-4" />} />
            <NextButton />
          </div>
        </div>
      </ComponentShowcase>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentShowcase
          title="IconButton · RowIconButton"
          description={s("icon_desc")}
          code={`
<IconButton icon={<MdAdd />} text="Add" />
<RowIconButton icon={<MdEdit />} title="Edit" variant="primary" />`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex gap-3">
              <IconButton icon={<MdAdd className="h-4 w-4" />} text={s("sample_add")} />
              <IconButton icon={<MdAdd className="h-4 w-4" />} loading text={s("sample_add")} />
            </div>
            <div className="flex gap-1 rounded-xl border border-slate-200 p-1">
              <RowIconButton icon={<MdVisibility className="h-4 w-4" />} title="View" />
              <RowIconButton icon={<MdEdit className="h-4 w-4" />} title="Edit" variant="primary" />
              <RowIconButton icon={<MdDelete className="h-4 w-4" />} title="Delete" variant="danger" />
            </div>
          </div>
        </ComponentShowcase>

        <ComponentShowcase
          title="DropdownButton"
          description={s("dropdown_desc")}
          code={`
<DropdownButton
  items={[
    { label: "Edit", icon: <MdEdit />, onClick: edit },
    { divider: true },
    { label: "Delete", icon: <MdDelete />, variant: "danger", onClick: remove },
  ]}
/>`}
        >
          <div className="flex min-h-[180px] items-start gap-3">
            <DropdownButton
              align="left"
              items={[
                { label: s("sample_view"), icon: <MdVisibility className="h-4 w-4" /> },
                { label: s("sample_edit"), icon: <MdEdit className="h-4 w-4" /> },
                { divider: true },
                { label: s("sample_danger"), icon: <MdDelete className="h-4 w-4" />, variant: "danger" },
              ]}
            />
            <DropdownButton variant="ghost" label={s("sample_more")} items={[]} disabled />
          </div>
        </ComponentShowcase>
      </div>
    </GuideSection>
  );
};

export default ButtonsSection;
