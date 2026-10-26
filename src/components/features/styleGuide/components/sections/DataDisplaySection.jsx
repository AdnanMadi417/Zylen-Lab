import React, { useState } from "react";
import { useGuideT } from "../../hooks/useUiTemplate";
import {
  MdFolderSpecial,
  MdPeople,
  MdEvent,
  MdVolunteerActivism,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdAdd,
} from "react-icons/md";
import PageHeader from "components/ui/PageHeader";
import InfoRow from "components/ui/InfoRow";
import StarRating from "components/ui/StarRating";
import FAQAccordion from "components/ui/FAQAccordion";
import DataTable from "components/ui/DataTable";
import Widget from "components/widget/Widget";
import Button from "components/ui/buttons/Button";
import GuideSection from "../GuideSection";
import ComponentShowcase from "../ComponentShowcase";

const STATUS_BADGE = {
  active:    "bg-green/10 text-green",
  planning:  "bg-amber-50 text-amber-600",
  completed: "bg-slate-100 text-slate-500",
};

const DataDisplaySection = () => {
  const t = useGuideT();
  const s = (k) => t(`styleGuide.data.${k}`);
  const [rating, setRating] = useState(4);

  const rows = [
    { id: 1, name: s("row1"), branch: s("branch_kl"), people: 320, status: "active" },
    { id: 2, name: s("row2"), branch: s("branch_penang"), people: 85, status: "planning" },
    { id: 3, name: s("row3"), branch: s("branch_kl"), people: 150, status: "completed" },
    { id: 4, name: s("row4"), branch: s("branch_johor"), people: 42, status: "active" },
  ];

  const columns = [
    { key: "name", label: s("col_project"), render: (r) => <span className="font-semibold text-slate-900">{r.name}</span> },
    { key: "branch", label: s("col_branch"), render: (r) => <span className="text-slate-500">{r.branch}</span> },
    { key: "people", label: s("col_people"), align: "center", render: (r) => <span className="text-slate-700">{r.people}</span> },
    {
      key: "status",
      label: s("col_status"),
      render: (r) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[r.status]}`}>
          {s(`status_${r.status}`)}
        </span>
      ),
    },
  ];

  return (
    <GuideSection id="data" title={s("title")} intro={s("intro")}>
      <ComponentShowcase
        title="PageHeader"
        description={s("header_desc")}
        code={`<PageHeader icon={<MdFolderSpecial />} title="Projects" subtitle="…" actions={<Button text="New project" />} />`}
      >
        <PageHeader
          className="!mb-0"
          icon={<MdFolderSpecial className="h-5 w-5" />}
          title={s("header_title")}
          subtitle={s("header_subtitle")}
          actions={<Button text={s("header_action")} icon={<MdAdd className="h-4 w-4" />} />}
        />
      </ComponentShowcase>

      <ComponentShowcase
        title="Widget (Card)"
        description={s("widget_desc")}
        canvas="muted"
        code={`<Widget icon={<MdPeople />} title="Beneficiaries" subtitle="1,284" />`}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Widget icon={<MdPeople className="h-6 w-6" />} title={s("stat_beneficiaries")} subtitle="1,284" />
          <Widget icon={<MdFolderSpecial className="h-6 w-6" />} title={s("stat_projects")} subtitle="36" />
          <Widget icon={<MdEvent className="h-6 w-6" />} title={s("stat_events")} subtitle="12" />
          <Widget icon={<MdVolunteerActivism className="h-6 w-6" />} title={s("stat_volunteers")} subtitle="248" />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="DataTable"
        description={s("table_desc")}
        code={`
<DataTable
  columns={[{ key: "name", label: "Project", render: (row) => row.name }]}
  data={projects}
  loading={loading}
/>`}
      >
        <DataTable columns={columns} data={rows} pageSize={4} />
      </ComponentShowcase>

      <div className="grid gap-8 lg:grid-cols-2">
        <ComponentShowcase
          title="InfoRow"
          description={s("info_desc")}
          code={`<InfoRow icon={<MdEmail />} label="Email" value="info@example.org" />`}
        >
          <div className="grid gap-3">
            <InfoRow icon={<MdEmail className="h-4 w-4" />} label={s("info_email")} value="info@example.com" />
            <InfoRow icon={<MdPhone className="h-4 w-4" />} label={s("info_phone")} value={<span dir="ltr">+60 3-1234 5678</span>} />
            <InfoRow icon={<MdLocationOn className="h-4 w-4" />} label={s("info_location")} value={s("branch_kl")} />
            <InfoRow icon={<MdCalendarToday className="h-4 w-4" />} label={s("info_joined")} value="12/03/2024" />
          </div>
        </ComponentShowcase>

        <div className="flex flex-col gap-8">
          <ComponentShowcase
            title="StarRating"
            description={s("rating_desc")}
            code={`<StarRating value={rating} onChange={setRating} />`}
          >
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{s("interactive")}</p>
                <StarRating value={rating} onChange={setRating} size="h-7 w-7" />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{s("read_only")}</p>
                <StarRating value={3} />
              </div>
            </div>
          </ComponentShowcase>

          <ComponentShowcase
            title="FAQAccordion"
            description={s("faq_desc")}
            code={`<FAQAccordion items={[{ q: "Question", a: "Answer" }]} />`}
          >
            <FAQAccordion
              items={[
                { q: s("faq_q1"), a: s("faq_a1") },
                { q: s("faq_q2"), a: s("faq_a2") },
              ]}
            />
          </ComponentShowcase>
        </div>
      </div>
    </GuideSection>
  );
};

export default DataDisplaySection;
