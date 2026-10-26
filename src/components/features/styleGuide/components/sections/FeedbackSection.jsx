import React from "react";
import { useGuideT } from "../../hooks/useUiTemplate";
import { MdInbox } from "react-icons/md";
import AlertBanner from "components/ui/AlertBanner";
import Button from "components/ui/buttons/Button";
import EmptyState from "components/empty/empty";
import Loading from "components/loading/Loading";
import Progress from "components/progress";
import { useToast } from "components/ui/toast/ToastContext";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";

const FeedbackSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.feedback.${k}`);
  const toast = useToast();

  return (
    <GuideSection id="feedback" title={s("title")} intro={s("intro")}>
      <ComponentShowcase
        title="AlertBanner"
        description={s("alert_desc")}
        code={`<AlertBanner variant="success" message="Your application was submitted." />`}
      >
        <div className="flex flex-col gap-3">
          {["success", "info", "warning", "error"].map((v) => (
            <AlertBanner key={v} variant={v} message={s(`alert_${v}`)} className="rounded-xl border px-4 py-3" />
          ))}
        </div>
      </ComponentShowcase>

      <div>
        <ComponentShowcase
          title="Toast"
          description={s("toast_desc")}
          code={`
const toast = useToast();
toast.success("Saved", "Your changes have been saved.");`}
        >
          <div className="flex flex-wrap gap-3">
            <Button text={s("toast_success")} onClick={() => toast.success(s("toast_success"), s("toast_success_msg"))} />
            <Button text={s("toast_error")} variant="danger" onClick={() => toast.error(s("toast_error"), s("toast_error_msg"))} />
            <Button text={s("toast_info")} variant="ghost" onClick={() => toast.info(s("toast_info"), s("toast_info_msg"))} />
          </div>
        </ComponentShowcase>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <ComponentShowcase
          title="EmptyState"
          description={s("empty_desc")}
          canvas="muted"
          code={`<EmptyState icon={<MdInbox />} title="No messages yet" description="…" />`}
        >
          <div className="rounded-2xl bg-white">
            <EmptyState
              icon={<MdInbox />}
              title={s("empty_title")}
              description={s("empty_text")}
              action={{ label: s("empty_action"), onClick: () => {} }}
            />
          </div>
        </ComponentShowcase>

        <ComponentShowcase
          title="Loading"
          description={s("loading_desc")}
          code={`<Loading size="md" text="Loading…" />`}
        >
          <div className="flex items-end justify-around">
            <Loading size="sm" text={null} />
            <Loading size="md" text={null} />
            <Loading size="lg" text={t("common.loading")} />
          </div>
        </ComponentShowcase>

        <ComponentShowcase
          title="Progress"
          description={s("progress_desc")}
          code={`<Progress value={68} color="brand" />`}
        >
          <div className="flex flex-col gap-5 py-4">
            {[
              { v: 82, c: "brand" },
              { v: 55, c: "amber" },
              { v: 24, c: "red" },
            ].map(({ v, c }) => (
              <div key={c}>
                <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-500">
                  <span>{s(`progress_${c}`)}</span>
                  <span>{v}%</span>
                </div>
                <Progress value={v} color={c} />
              </div>
            ))}
          </div>
        </ComponentShowcase>
      </div>

    </GuideSection>
  );
};

export default FeedbackSection;
