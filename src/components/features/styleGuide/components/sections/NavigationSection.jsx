import React, { useState } from "react";
import { MdDashboard, MdPeople, MdSettings } from "react-icons/md";
import Tabs from "components/ui/Tabs";
import Breadcrumbs from "components/ui/Breadcrumbs";
import Stepper from "components/ui/Stepper";
import NextButton from "components/ui/buttons/NextButton";
import PrevButton from "components/ui/buttons/PrevButton";
import { useGuideT } from "../../hooks/useUiTemplate";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";

const NavigationSection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.navigation.${k}`);
  const [tab, setTab] = useState("overview");
  const [pill, setPill] = useState("week");
  const [step, setStep] = useState(1);
  const steps = [1, 2, 3, 4].map((n) => ({ label: s(`step_${n}`), description: s(`step_${n}_desc`) }));

  return (
    <GuideSection id="navigation" title={s("title")} intro={s("intro")}>
      <ComponentShowcase
        title="Tabs"
        description={s("tabs_desc")}
        code={`
<Tabs
  tabs={[{ key: "overview", label: "Overview" }, { key: "members", label: "Members", count: 24 }]}
  value={tab}
  onChange={setTab}
/>
<Tabs variant="pills" tabs={…} value={range} onChange={setRange} />`}
      >
        <div className="flex flex-col gap-8">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { key: "overview", label: s("tab_overview"), icon: <MdDashboard className="h-4 w-4" /> },
              { key: "members", label: s("tab_members"), icon: <MdPeople className="h-4 w-4" />, count: 24 },
              { key: "settings", label: s("tab_settings"), icon: <MdSettings className="h-4 w-4" /> },
            ]}
          />
          <Tabs
            variant="pills"
            value={pill}
            onChange={setPill}
            tabs={["day", "week", "month", "year"].map((k) => ({ key: k, label: s(`range_${k}`) }))}
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Breadcrumbs"
        description={s("breadcrumbs_desc")}
        code={`<Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Members", to: "/members" }, { label: "Aisha Rahman" }]} />`}
      >
        <Breadcrumbs items={[{ label: s("crumb_home"), to: "#" }, { label: s("crumb_section"), to: "#" }, { label: s("crumb_page") }]} />
      </ComponentShowcase>

      <ComponentShowcase
        title="Stepper"
        description={s("stepper_desc")}
        code={`<Stepper steps={[{ label: "Details" }, { label: "Documents" }, { label: "Review" }]} current={step} />`}
      >
        <div className="flex flex-col gap-8">
          <Stepper steps={steps} current={step} />
          <div className="flex justify-between">
            <PrevButton text={t("table.prev")} onClick={() => setStep((n) => Math.max(0, n - 1))} disabled={step === 0} />
            <NextButton text={t("table.next")} onClick={() => setStep((n) => Math.min(steps.length, n + 1))} disabled={step === steps.length} />
          </div>
        </div>
      </ComponentShowcase>
    </GuideSection>
  );
};

export default NavigationSection;
